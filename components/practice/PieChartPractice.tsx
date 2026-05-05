import { Dimensions, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

type Props = {
    filteredItems: { id: string; name: string; amount: number; category: string; date: string; }[];
}
const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

export default function PieChartPractice( { filteredItems }: Props ) {
    const accTotal = filteredItems.reduce((acc, item) => {
        if (acc[item.category]) {
            acc[item.category] = acc[item.category] + item.amount;
        } else {
            acc[item.category] = item.amount;
        }
        return acc;
    }, {} as { [key: string]: number });

    const data = Object.entries(accTotal).map(([category, total], index) => ({
        name: category,
        population: total,
        color: colors[index % colors.length],
        legendFontColor: "#333333",
        legendFontSize: 14,
    })); 

    return (
        <View>
            <PieChart
                data={data}
                width={Dimensions.get('window').width}
                height={220}
                chartConfig={{ color: () => '#000' }}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
            />    
        </View>
    )
}