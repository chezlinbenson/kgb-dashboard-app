import "./Widget.css";
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
// import BarChart from "../BarChart"



const Widget = ({ type, widgetData }) => {


    let data;

    switch (type) {
        case "Payed":
            data = {
                title: "Amount Payed",
                amount: widgetData.totalPay,
                due: widgetData.totalDue,
                isMoney: true,
                icon: (
                    <InsertChartOutlinedOutlinedIcon className="icon" />
                )
            }
            break;
        case "Summary":
            data = {
                title: "Summary",
                isMoney: false,
                icon: (
                    <QueryStatsOutlinedIcon className="icon" />
                ),
                // chart: (
                //     <BarChart className="vertical-bar" />
                // )
            };
            break;
        case "Due":
            data = {
                title: "Amount Due",
                isMoney: true,
                icon: (
                    <DescriptionOutlinedIcon className="icon" />
                )
            };
            break;
        default:
            break;
    }
    return (
        <section className="Debtors-Widget">
            <div className="Widget-Container">
                <div className="box-left">
                    <span className="title">{data.title}</span>
                    <span className="counter">
                        {data.isMoney && "R"} {data.amount}
                    </span>
                </div>
                <div className="box-right">
                    <span className="icon">{data.icon}</span>
                    <div className="persentage">R{diff}</div>
                </div>
            </div>
        </section>
    )
}

export default Widget