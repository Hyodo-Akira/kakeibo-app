import { calcCategoryTotal } from "../utils/calcCategoryTotal";

test('同じカテゴリが2件あるとき合計が正しく計算される', () => {
    // 準備：テスト用のデータを用意する
    const items = [
        { id: "1", name: "ランチ", amount: 800, category: "食費" },
        { id: "2", name: "夕食", amount: 1200, category: "食費" }
    ];

    // 実行：関数を呼ぶ
    const result = calcCategoryTotal(items);

    // 確認：期待する結果と一致するか
    expect(result).toEqual({ "食費": 2000 });
});

test('カテゴリが複数ある時、それぞれ別々に集計される', () => {

    const items = [
        { id: "1", name: "ランチ", amount: 800, category: "食費" },
        { id: "2", name: "電車", amount: 300, category: "交通費" }
    ];

    const result = calcCategoryTotal(items);

    expect(result).toEqual({ "食費": 800, "交通費": 300 });
});

test('データが空（0件）のとき、空のオブジェクトが返る', () => {

    const items: { id: string; name: string; amount: number; category: string; }[] = [];

    const result = calcCategoryTotal(items);

    expect(result).toEqual({});
});
