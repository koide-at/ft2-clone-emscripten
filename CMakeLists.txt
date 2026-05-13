cmake_minimum_required(VERSION 3.14)

project(ft2-clone LANGUAGES C CXX)

set(CMAKE_RUNTIME_OUTPUT_DIRECTORY "${CMAKE_SOURCE_DIR}/release/other/")
option(FT2_WEB_PTHREADS "Enable pthreads in Emscripten build" ON)
# Single-threaded web builds: full Disk op. directory scan + sort can freeze the browser tab.
# Dummy mode shows only ".." (no FS scan); turn OFF for real listing (unsorted on web ST).
option(FT2_WEB_DISKOP_DUMMY "Emscripten: Disk op. placeholder list only (no directory scan)" OFF)

file(GLOB ft2-clone_SRC
    "${CMAKE_SOURCE_DIR}/src/rtmidi/*.cpp"
    "${CMAKE_SOURCE_DIR}/src/*.c"
    "${CMAKE_SOURCE_DIR}/src/gfxdata/*.c"
    "${CMAKE_SOURCE_DIR}/src/mixer/*.c"
    "${CMAKE_SOURCE_DIR}/src/scopes/*.c"
    "${CMAKE_SOURCE_DIR}/src/modloaders/*.c"
    "${CMAKE_SOURCE_DIR}/src/smploaders/*.c"
)

list(REMOVE_ITEM ft2-clone_SRC
    "${CMAKE_SOURCE_DIR}/src/gfxdata/bmp/win32 tools/bin2h.c"
    "${CMAKE_SOURCE_DIR}/src/helpdata/code/ft2hlp_to_h.c")

if(EMSCRIPTEN)
    list(REMOVE_ITEM ft2-clone_SRC
        "${CMAKE_SOURCE_DIR}/src/rtmidi/RtMidi.cpp"
        "${CMAKE_SOURCE_DIR}/src/rtmidi/rtmidi_c.cpp")
    list(APPEND ft2-clone_SRC "${CMAKE_SOURCE_DIR}/src/ft2_emscripten.c")
    set(CMAKE_EXECUTABLE_SUFFIX ".html")
endif()

add_executable(ft2-clone ${ft2-clone_SRC})

if(EMSCRIPTEN)
    # Emit release/other/index.html (and index.js / index.wasm) instead of ft2-clone.html
    set_target_properties(ft2-clone PROPERTIES OUTPUT_NAME "index")
endif()

if(NOT EMSCRIPTEN)
    find_package(SDL2 REQUIRED)
    target_include_directories(ft2-clone SYSTEM
        PRIVATE ${SDL2_INCLUDE_DIRS})

    if("${SDL2_LIBRARIES}" STREQUAL "")
        message(WARNING "SDL2_LIBRARIES wasn't set, manually setting to SDL2::SDL2")
        set(SDL2_LIBRARIES "SDL2::SDL2")
    endif()

    find_package(Threads REQUIRED)

    if((CMAKE_CXX_COMPILER_ID MATCHES "Clang") OR (CMAKE_CXX_COMPILER_ID MATCHES "GNU"))
        target_compile_options(ft2-clone PRIVATE -O3 -ffast-math)
    endif()

    target_link_libraries(ft2-clone
        PRIVATE m Threads::Threads ${SDL2_LIBRARIES})

    target_compile_definitions(ft2-clone PRIVATE HAS_MIDI)

    if(UNIX)
        if(APPLE)
            find_library(COREAUDIO CoreAudio REQUIRED)
            find_library(COREFOUNDATION CoreFoundation REQUIRED)
            find_library(COREMIDI CoreMIDI REQUIRED)
            find_library(ICONV iconv REQUIRED)
            target_link_libraries(ft2-clone
                PRIVATE ${COREAUDIO} ${COREMIDI} ${COREFOUNDATION} ${ICONV})
            target_compile_definitions(ft2-clone
                PRIVATE __MACOSX_CORE__)
        else()
            find_library(FTS fts)
            if (FTS)
                target_link_libraries(ft2-clone PRIVATE fts)
            endif()
            target_link_libraries(ft2-clone
                PRIVATE asound)
            target_compile_definitions(ft2-clone
                PRIVATE __LINUX_ALSA__)
        endif()
    endif()
else()
    target_compile_options(ft2-clone PRIVATE -O3 -ffast-math "SHELL:-sUSE_SDL=2")
    target_compile_definitions(ft2-clone PRIVATE HAS_MIDI)

    if(FT2_WEB_PTHREADS)
        target_compile_options(ft2-clone PRIVATE -pthread)
    endif()

    target_link_options(ft2-clone PRIVATE
        "SHELL:-sUSE_SDL=2"
        "SHELL:-lidbfs.js"
        "SHELL:-sALLOW_MEMORY_GROWTH=1"
        "SHELL:-sINITIAL_MEMORY=268435456"
        "SHELL:-sSTACK_SIZE=5242880"
        "SHELL:-sFORCE_FILESYSTEM=1"
        "SHELL:-sEXPORTED_RUNTIME_METHODS=[\"UTF8ToString\",\"stringToUTF8\",\"FS\"]"
        "SHELL:-sEXPORTED_FUNCTIONS=[_main,_ft2_ems_after_import,_ft2_ems_set_display_scale,_ft2_keymap_reset_defaults,_ft2_keymap_get_binding_packed,_ft2_keymap_set_binding]"
    )

    if(NOT FT2_WEB_PTHREADS)
        target_link_options(ft2-clone PRIVATE
            "SHELL:-sASYNCIFY"
            "SHELL:-sASYNCIFY_STACK_SIZE=262144"
            "SHELL:-sASYNCIFY_IMPORTS=[emscripten_sleep]"
        )
    endif()

    if(FT2_WEB_PTHREADS)
        target_link_options(ft2-clone PRIVATE
            "SHELL:-pthread"
            "SHELL:-sUSE_PTHREADS=1"
            "SHELL:-sPTHREAD_POOL_SIZE=8"
        )
    endif()
endif()

if(EMSCRIPTEN)
    if(FT2_WEB_DISKOP_DUMMY)
        target_compile_definitions(ft2-clone PRIVATE FT2_WEB_DISKOP_DUMMY=1)
    endif()
    target_link_options(ft2-clone PRIVATE
        "SHELL:--pre-js;${CMAKE_SOURCE_DIR}/src/web/ft2_prejs.js"
        "SHELL:--shell-file;${CMAKE_SOURCE_DIR}/src/web/shell.html")
    # Pre-js/shell are linker inputs; without this, incremental builds may skip relinking
    # and ship stale ft2-clone.js (embedded pre-js out of date).
    set_property(TARGET ft2-clone APPEND PROPERTY LINK_DEPENDS
        "${CMAKE_SOURCE_DIR}/src/web/ft2_prejs.js"
        "${CMAKE_SOURCE_DIR}/src/web/shell.html")
    add_custom_command(TARGET ft2-clone POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy_if_different
            "${CMAKE_SOURCE_DIR}/src/gfxdata/icon/ft2-clone.png"
            "$<TARGET_FILE_DIR:ft2-clone>/ft2-web-toolbar-icon.png"
        COMMAND ${CMAKE_COMMAND} -E rm -f
            "$<TARGET_FILE_DIR:ft2-clone>/ft2-clone.html"
            "$<TARGET_FILE_DIR:ft2-clone>/ft2-clone.js"
            "$<TARGET_FILE_DIR:ft2-clone>/ft2-clone.wasm"
        COMMENT "Copy web toolbar icon next to index.html; drop legacy ft2-clone.* names if upgrading"
        VERBATIM)
endif()

install(TARGETS ft2-clone
    RUNTIME DESTINATION bin)
