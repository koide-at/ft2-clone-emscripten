#pragma once

#ifdef __EMSCRIPTEN__

#include <stdbool.h>

void ft2_ems_chdir_persistent(void);
void ft2_ems_sync_fs_out(void);
void ft2_ems_offer_download_path(const char *path);
void ft2_ems_after_import(void);
/* Call once per inner-frame from okBox/inputBox so the browser tab stays responsive (requires ASYNCIFY). */
void ft2_ems_modal_yield(void);

/* Web display scale: 1, 2, or 3 (CSS size only; backing store stays SCREEN size). */
void ft2_ems_set_display_scale(int scale);
int ft2_ems_get_display_scale(void);

#endif
