# ft2-clone Shortcuts / 機能一覧と実装確認

この文書は `src/ft2_keyboard.c` を基準に、ショートカットと割り当て機能を整理したものです。

- 実装確認: ソースコード上でハンドラ呼び出しを確認済み
- 動作確認: 実機でキー入力して期待動作を確認

## Web Keybinds 対応メモ（2026-04時点）

- `Keybinds` で本書の主要ショートカット群（F1..F12含む）を再割当て可能
- Fキー系のため、無修飾（modifierなし）の割り当ても保存可能
- 同一ショートカット重複は「警告のみ」で保存可能（保存時に警告文を表示）
- `Reset Defaults` は現在の `defaultBindings` に戻す（ページ再読み込み後も維持）
- 設定は Web 側ストレージ（`localStorage`）に保持される

## 1. 再生・トランスポート


| キー                        | 機能                | 実装確認                                     | 動作確認 |
| ------------------------- | ----------------- | ---------------------------------------- | ---- |
| `RShift`                  | Record pattern 開始 | OK (`startPlaying(PLAYMODE_RECPATT, 0)`) | TODO |
| `RCtrl` (`macOS`: `RGUI`) | Song 再生           | OK (`startPlaying(PLAYMODE_SONG, 0)`)    | TODO |
| `RAlt`                    | Pattern 再生        | OK (`startPlaying(PLAYMODE_PATT, 0)`)    | TODO |
| `Space`                   | Edit/Stop トグル     | OK (`playMode` 切替 / `stopPlaying`)       | TODO |
| `Esc`                     | 終了確認ダイアログ         | OK (`quitBox`)                           | TODO |


## 2. カーソル・行移動


| キー                  | 機能          | 実装確認                         | 動作確認 |
| ------------------- | ----------- | ---------------------------- | ---- |
| `Tab` / `Shift+Tab` | フィールド移動 右/左 | OK (`cursorTabRight/Left`)   | TODO |
| `Left` / `Right`    | カーソル左右      | OK (`cursorLeft/Right`)      | TODO |
| `Up` / `Down`       | 行移動         | OK (`rowOneUpWrap/DownWrap`) | TODO |
| `Shift+Up/Down`     | 現在インスト変更    | OK (`decCurIns/incCurIns`)   | TODO |
| `Alt+Up/Down`       | パターンマーク上下   | OK (`keybPattMarkUp/Down`)   | TODO |
| `PageUp/PageDown`   | 16行ジャンプ     | OK                           | TODO |
| `Home/End`          | 先頭/末尾行へ     | OK                           | TODO |


## 3. Fキー（オクターブ/編集/ジャンプ）


| キー                          | 機能                                    | 実装確認 | 動作確認 |
| --------------------------- | ------------------------------------- | ---- | ---- |
| `F1..F6`                    | Octave 0..5                           | OK   | TODO |
| `F7/F8`                     | Octave 6                              | OK   | TODO |
| `F1/F2 + Shift/Ctrl/Alt`    | トランスポーズ（Track/Pattern/Block, All Ins） | OK   | TODO |
| `F7/F8 + Shift/Ctrl/Alt`    | トランスポーズ（Track/Pattern/Block, Cur Ins） | OK   | TODO |
| `F3/F4/F5 + Shift/Ctrl/Alt` | Cut/Copy/Paste（Track/Pattern/Block）   | OK   | TODO |
| `F9..F12`                   | 行ジャンプ (`ptnJumpPos[0..3]`)            | OK   | TODO |
| `Ctrl+F9..F12`              | その行から Pattern 再生                      | OK   | TODO |
| `Shift+F9..F12`             | 現在行をジャンプ位置に記録                         | OK   | TODO |


## 4. パターン編集


| キー                              | 機能          | 実装確認                  | 動作確認 |
| ------------------------------- | ----------- | --------------------- | ---- |
| `Insert` / `Shift+Insert`       | ノート挿入 / 行挿入 | OK                    | TODO |
| `Backspace` / `Shift+Backspace` | ノート削除 / 行削除 | OK                    | TODO |
| `Backspace` (`Disk Op`)         | 親ディレクトリへ    | OK (`diskOpGoParent`) | TODO |
| `Ctrl+Enter`                    | ノート挿入       | OK                    | TODO |
| `Ctrl+Shift+Enter`              | 行挿入         | OK                    | TODO |


## 5. 画面切替（Ctrl系）


| キー       | 機能                                  | 実装確認 | 動作確認 |
| -------- | ----------------------------------- | ---- | ---- |
| `Ctrl+A` | Advanced Edit                       | OK   | TODO |
| `Ctrl+B` | About                               | OK   | TODO |
| `Ctrl+C` | Config（Sample Editor中は sample copy） | OK   | TODO |
| `Ctrl+D` | Disk Op                             | OK   | TODO |
| `Ctrl+E` | Sample Editor Ext                   | OK   | TODO |
| `Ctrl+H` | Help                                | OK   | TODO |
| `Ctrl+I` | Instrument Editor                   | OK   | TODO |
| `Ctrl+M` | Instrument Editor Ext               | OK   | TODO |
| `Ctrl+N` | Nibbles                             | OK   | TODO |
| `Ctrl+P` | Pattern Editor 表示                   | OK   | TODO |
| `Ctrl+R` | Trim Screen                         | OK   | TODO |
| `Ctrl+S` | Sample Editor                       | OK   | TODO |
| `Ctrl+T` | Transpose Screen                    | OK   | TODO |
| `Ctrl+X` | 各画面を閉じて Pattern Editor へ戻る          | OK   | TODO |
| `Ctrl+Z` | Extended Pattern Editor トグル         | OK   | TODO |


## 6. Alt系（チャンネルジャンプ / Sample Editor操作）

`Alt+QWERTYUIOPASDFGHJKLYXCVB...` は主に `jumpToChannel()` と Sample Editor機能に割り当て。

代表例:


| キー                          | 機能                       | 実装確認 | 動作確認 |
| --------------------------- | ------------------------ | ---- | ---- |
| `Alt+Q..K`                  | Channel 0..15 へジャンプ（配列順） | OK   | TODO |
| `Alt+R` (Sample Editor)     | Crop                     | OK   | TODO |
| `Alt+S` (Sample Editor)     | Show Range               | OK   | TODO |
| `Alt+Z` (Sample Editor)     | Zoom Out                 | OK   | TODO |
| `Alt+C/V/X` (Sample Editor) | Copy/Paste/Cut           | OK   | TODO |


## 7. ボリュームスケール


| キー        | 機能                        | 実装確認 | 動作確認 |
| --------- | ------------------------- | ---- | ---- |
| `Alt+V`   | Block volume scale/fade   | OK   | TODO |
| `Ctrl+V`  | Pattern volume scale/fade | OK   | TODO |
| `Shift+V` | Track volume scale/fade   | OK   | TODO |


## 8. 設定画面ショートカット / MIDI Macro


| キー               | 機能                              | 実装確認 | 動作確認 |
| ---------------- | ------------------------------- | ---- | ---- |
| `Ctrl+1`         | Config: Audio                   | OK   | TODO |
| `Ctrl+2`         | Config: Layout                  | OK   | TODO |
| `Ctrl+3`         | Config: Misc                    | OK   | TODO |
| `Ctrl+4`         | Config: MIDI Input (`HAS_MIDI`) | OK   | TODO |
| `Alt+1..0`       | Macro slot read                 | OK   | TODO |
| `Alt+Shift+1..0` | Macro slot write                | OK   | TODO |


## 9. テンキー系（楽器バンク / 追加機能）


| キー                          | 機能                              | 実装確認 | 動作確認 |
| --------------------------- | ------------------------------- | ---- | ---- |
| `KP Enter`                  | Instrument bank swap            | OK   | TODO |
| `KP 0..8`                   | Instrument selection            | OK   | TODO |
| `KP +/- + Ctrl`             | Master volume ±16（非FT2拡張）       | OK   | TODO |
| `KP .`                      | Clear sample / Clear instrument | OK   | TODO |
| `KP +` + `NumLock/KP / * -` | Bank 1..16 選択                   | OK   | TODO |


## 10. その他


| キー                       | 機能                 | 実装確認 | 動作確認 |
| ------------------------ | ------------------ | ---- | ---- |
| `/` Shift+`              | Edit skip 増減       | OK   | TODO |
| `Delete` (Sample Editor) | Sample cut（非FT2拡張） | OK   | TODO |
| `Alt+Enter`              | Fullscreen toggle  | OK   | TODO |
| `Ctrl+Shift+F`           | FPS表示トグル           | OK   | TODO |


## 11. 実装の正しさ確認（推奨手順）

1. まず Web で主要キー（再生・編集・画面切替）を確認
2. 特に `Ctrl+Enter`, `Insert`, `Backspace` 系は誤操作が起きやすいので優先
3. `Alt+Q..K` のチャンネルジャンプは 0..15 すべて走査
4. テンキー系は NumLock ON/OFF 両方で確認
5. macOS の場合は `Command` 代替が入る箇所（Copy/Paste/Cut, fullscreen）も確認

## 12. 注意

- 一部は画面状態依存（Sample Editor表示中のみ有効など）
- `handleEditKeys()` 側にも編集系ショートカットがあるため、完全網羅には同ファイルの追加確認が必要
- この文書は `ft2_keyboard.c` の実装ベースのため、将来更新時は再生成してください

