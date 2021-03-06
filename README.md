# TypeScript 練習アプリ パズルゲームシミュレータ

TypeScript用の課題ということで、パズルゲームのシミュレーションをするようなアプリを作成した。  
土曜日～火曜日の午前の3.5日間ほどで作成した。

## 環境

#### 各バージョン
> node --version  
> v8.12.0  
> npm --version  
> 6.4.1

> "typescript": "3.1.3"  
> "target": "es5",

#### 開発環境
* Windows 10
* VSCode


## ソース概要

### 前提

* パズルゲームの画面は左上が(0, 0)、右がX方向、下がY方向とする。
    * ２次配列でarray[Y][X]とすると画面と配列でギャップが少なくなるため。

#### Piece.ts
* パズルの１ピースを表すためのクラス、プロパティはx座標・y座標・ピースの値、のみ。

#### PieceContainer.ts
* パズルのピースを格納している画面をイメージしたクラス。
* パズルのピースの管理はこのクラスのフィールドの２次配列で行っている。
* このクラスから特定のピースを取り出すときは、扱いやすいようにPiece越しで返している。


## 実行方法

npm install したあとにmain.tsを実行してください。順番に課題が実行されていきます。
> .\node_modules\.bin\ts-node .\src\main.ts


## 対応状況

* 【NG】テストが行えていない。
    * 挙動確認、デバッグでの確認のみとなります。。
    * テストコードを書いた機会があまりなく、出来ていてもテストシートの作成だったかと思います。
* (1) 配列のランダム生成、縦か横に連鎖(３連続同じ値)した場合の検知・表示 **⇒ 対応済み**
* (2) ランダム生成時に初回から連鎖しないようにする。 **⇒ 対応済み**
* (3) (2)の状態の配列を生成し、隣接する値を入れ替えると連鎖する場所を検知する **⇒ 対応済み**
* (4) 【NG】(3)のパターンに、斜めの値を入れ替えた場合を追加する。 **⇒ 未対応**
    * PieceContainer#getChainablePiecesArray() に似た処理を作成すれば、行けたハズ。


## 振り返って

* TypeScriptを触るのが初めてだった。
    * export/import周りがかなり苦戦した、結局namespaceとの使い分けも落とし込めていない。
    * かなりJavaっぽく(C#っぽくが正しいのだろうが)書けるのだなぁと、少し感動した。
    * ファイル名などの大文字小文字の使い分け等が分からなかったので、一先ずJavaと同じような感覚で書いた。
    * VSCodeはかなり便利そうなので、これからも使いたいなと思った。(今までAtomを使っていた。)
* 「パズルゲーム」
    * 正直、検索などにfor文やイテレータを使いすぎている。。
    * 連鎖という意味で「Chain」という言葉を使ったが、初見だと良くわからないかもしれない。良くない名前。
    * どうクラスに落とし込むかで凄く悩んでしまった。そのまま２次配列扱うのが嫌でPieceクラス作ったが、検索することなど考えると２次配列だけでやって良かったかもしれない。