#ifdef __EMSCRIPTEN__

#include <stdio.h>
#include <unistd.h>
#include <emscripten.h>
#include <emscripten/threading.h>
#include "ft2_emscripten.h"
#include "ft2_structs.h"

static int ft2_ems_display_scale = 1;

int ft2_ems_get_display_scale(void)
{
	return ft2_ems_display_scale;
}

EMSCRIPTEN_KEEPALIVE void ft2_ems_set_display_scale(int scale)
{
	if (scale < 1)
		scale = 1;
	else if (scale > 3)
		scale = 3;

	ft2_ems_display_scale = scale;
}

EM_JS(void, ft2_offer_download_js, (const char *path), {
	var p = UTF8ToString(path);
	try {
		var slash = p.lastIndexOf('/');
		var name = (slash >= 0) ? p.slice(slash + 1) : p;
		if (!name.length) {
			name = 'download.bin';
		}
		var data = FS.readFile(p);
		var blob = new Blob([data]);
		var url = URL.createObjectURL(blob);
		var a = document.createElement('a');
		a.href = url;
		a.download = name;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	} catch (e) {
		console.warn('ft2-clone: download ' + p + ' ' + e);
	}
});

void ft2_ems_chdir_persistent(void)
{
	if (chdir("/ft2_persistent") != 0)
		chdir("/");
}

void ft2_ems_sync_fs_out(void)
{
	EM_ASM(
		FS.syncfs(false, function (err) {
			if (err) {
				console.warn('ft2-clone: IDBFS save ' + err);
			}
		});
	);
}

void ft2_ems_offer_download_path(const char *path)
{
	if (path == NULL)
		return;

	ft2_offer_download_js(path);
}

void ft2_ems_modal_yield(void)
{
#if !defined(__EMSCRIPTEN_PTHREADS__)
	/* Return to the JS event loop briefly; okBox/inputBox run a nested render loop
	   inside emscripten_set_main_loop, which would otherwise freeze the tab.
	   Requires -sASYNCIFY (enabled for FT2_WEB_PTHREADS=OFF builds). */
	emscripten_sleep(1);
#endif
}

EMSCRIPTEN_KEEPALIVE void ft2_ems_after_import(void)
{
	if (ui.diskOpShown)
		editor.diskOpReadDir = true;
}

#endif
