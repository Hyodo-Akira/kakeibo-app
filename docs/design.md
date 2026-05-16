## ホーム

### ホーム画面
- その月のカレンダーを表示する(前月のクレカ引き落とし額を支出に含めるか含めないかはボタンで切り替えられる、引き落とし日が来るまでは常に収支が−になる可能性があるためと支出合計がどれくらいかは把握しておきたいため)
- カレンダーの日付をタップするとその日の収支詳細画面が表示される
- 過去のデータも表示できる
- 収入入力欄
- 支出入力欄
- その月の収支合計表示
- 総資産表示

### レシート撮影
- レシート撮影画面

### 撮影内容確認
- レシート撮影で取り込んだ内容の確認、編集

### 詳細画面
- タップした日付の収支詳細が表示される
- 項目の編集や削除ができる


## カテゴリ

### カテゴリ別合計表示画面
- カテゴリ別合計表示
- カテゴリ別円グラフ表示
- 過去の内容も表示できる

### カテゴリ追加、修正画面
- カテゴリ追加、修正


## 資産

### 資産画面
- 貯金額表示（口座ごと）
- 総貯金額表示
- 目標金額決めていれば目標までの％とそこまで毎月いくら必要か表示
- 証券表示
- 各伸び率グラフ表示

### 口座設定画面
- 口座作成
- クレカや固定費の紐付け先設定


## 固定費

### 固定費設定画面
- サブスクや奨学金などの定期支出に設定されている項目を表示
- 奨学金などの回数が決まっているものであれば、残り回数や返済完了予定月も表示する

### 固定費編集画面
- サブスクや奨学金などの定期支出に設定されている項目を編集する画面


---

## データ設計

### テーブル一覧

| テーブル | 役割 |
|---------|------|
| `transactions` | 収支記録 |
| `categories` | カテゴリ管理 |
| `fixed_costs` | 固定費・サブスク・奨学金 |
| `accounts` | 口座管理 |
| `credit_cards` | クレカ管理 |
| `securities` | 証券・投資管理 |
| `goals` | 目標貯金管理 |

---

### `transactions`（収支）

| カラム名 | 型 | 内容 |
|---------|-----|------|
| `id` | UUID | 主キー |
| `user_id` | UUID | ユーザーID（Auth参照） |
| `name` | TEXT | 項目名 |
| `amount` | INTEGER | 金額 |
| `type` | TEXT | `"income"` or `"expense"` |
| `category_id` | UUID | カテゴリID（categories参照） |
| `date` | DATE | 日付 |
| `credit_card_id` | UUID | クレカID（nullable） |
| `account_id` | UUID | 口座ID（nullable） |
| `fixed_cost_id` | UUID | 固定費ID（nullable） |

### `categories`（カテゴリ）

| カラム名 | 型 | 内容 |
|---------|-----|------|
| `id` | UUID | 主キー |
| `user_id` | UUID | ユーザーID（Auth参照） |
| `name` | TEXT | カテゴリ名（例：食費） |
| `type` | TEXT | `"income"` or `"expense"` |

### `fixed_costs`（固定費）

| カラム名 | 型 | 内容 |
|---------|-----|------|
| `id` | UUID | 主キー |
| `user_id` | UUID | ユーザーID（Auth参照） |
| `name` | TEXT | 固定費名（例：Netflix） |
| `amount` | INTEGER | 金額 |
| `withdrawal_date` | INTEGER | 引き落とし日（例：25） |
| `payment_interval` | TEXT | 支払い間隔（例：`"monthly"`, `"yearly"`） |
| `number_of_repayments` | INTEGER | 総返済回数（サブスクはnullable） |
| `expected_month_of_full_repayment` | DATE | 完済予定月（サブスクはnullable） |

### `accounts`（口座）

| カラム名 | 型 | 内容 |
|---------|-----|------|
| `id` | UUID | 主キー |
| `user_id` | UUID | ユーザーID（Auth参照） |
| `name` | TEXT | 口座名（例：楽天銀行） |
| `amount` | INTEGER | 残高 |
| `type` | TEXT | 種別（例：`"普通預金"`, `"定期預金"`） |

### `credit_cards`（クレカ）

| カラム名 | 型 | 内容 |
|---------|-----|------|
| `id` | UUID | 主キー |
| `user_id` | UUID | ユーザーID（Auth参照） |
| `name` | TEXT | カード名（例：楽天カード） |
| `account_id` | UUID | 紐付け口座ID（accounts参照） |
| `withdrawal_date` | INTEGER | 引き落とし日（例：27） |

### `securities`（証券）

| カラム名 | 型 | 内容 |
|---------|-----|------|
| `id` | UUID | 主キー |
| `user_id` | UUID | ユーザーID（Auth参照） |
| `name` | TEXT | 銘柄名（例：S&P500） |
| `principal` | INTEGER | 元本（購入金額） |
| `valuation` | INTEGER | 評価額（現在の価値） |
| `purchase_date` | DATE | 購入日 |

### `goals`（目標）

| カラム名 | 型 | 内容 |
|---------|-----|------|
| `id` | UUID | 主キー |
| `user_id` | UUID | ユーザーID（Auth参照） |
| `name` | TEXT | 目標名（例：旅行資金） |
| `target_amount` | INTEGER | 目標金額 |
| `target_date` | DATE | 達成期限 |
| `account_id` | UUID | 対象口座ID（accounts参照） |

---

## 設定（これはヘッダーに記載でいい気がする）

### アカウント設定画面
- メールアドレスやパスワードを設定する

### 通知設定
- 入力リマインド設定

### 目標設定
- 目標金額や期間を設定
