#pragma once

#ifdef HAS_MIDI

#include <stdint.h>
#include <stdbool.h>
#ifdef __EMSCRIPTEN__
#include <SDL.h>
#else
#include <SDL2/SDL.h>
#endif

#define MIDI_INPUT_SELECTOR_BOX_WIDTH 247
#define MAX_MIDI_DEVICES 99

typedef struct midi_t
{
	char *inputDeviceName, *inputDeviceNames[MAX_MIDI_DEVICES];
	volatile bool initThreadDone, callbackBusy, enable;
	bool rescanDevicesFlag;
	uint32_t inputDevice, numInputDevices;
	int16_t currMIDIVibDepth, currMIDIPitch;
#if defined(__APPLE__) || defined(__EMSCRIPTEN__)
	SDL_Thread *initMidiThread;
#endif
} midi_t;

extern midi_t midi; // ft2_midi.c

void closeMidiInDevice(void);
void freeMidiIn(void);
bool initMidiIn(void);
bool openMidiInDevice(uint32_t deviceID);
void recordMIDIEffect(uint8_t efx, uint8_t efxData);
bool saveMidiInputDeviceToConfig(void);
bool setMidiInputDeviceFromConfig(void);
void freeMidiInputDeviceList(void);
void rescanMidiInputDevices(void);
void drawMidiInputList(void);
void scrollMidiInputDevListUp(void);
void scrollMidiInputDevListDown(void);
void sbMidiInputSetPos(uint32_t pos);
bool testMidiInputDeviceListMouseDown(void);
int32_t initMidiFunc(void *ptr);

#ifdef __EMSCRIPTEN__
/* Refresh Web MIDI access/port list; rescan when inputs change (needed for FT2_WEB_PTHREADS=OFF). */
void ft2_midi_tick_web_ports(void);
#endif

#endif
