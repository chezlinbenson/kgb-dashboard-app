import "./Widget.css";
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
// import BarChart from "../BarChart"



const Widget = ({ type, widgetData }) => {

    let data;
    //temporary
    console.log("Widget Data", widgetData)
    const amount = widgetData.reduce((accum, current) => accum + current.Amount, 0)
    const diff = 30
    console.log({ amount })

    switch (type) {
        case "Payed":
            data = {
                title: "Amount Payed",
                amount: amount,
                isMoney: true,
                icon: (
                    <InsertChartOutlinedOutlinedIcon className="icon" />
                )
            }
            break;
        case "Due":
            data = {
                title: "Amount Due",
                isMoney: false,
                icon: (
                    <QueryStatsOutlinedIcon className="icon" />
                ),
                // chart: (
                //     <BarChart className="vertical-bar" />
                // )
            };
            break;
        case "Overview":
            data = {
                title: "Overview",
                isMoney: false,
                icon: (
                    <InsertChartOutlinedOutlinedIcon className="icon" />
                )
            };
            break;
        case "Summary":
            data = {
                title: "Summary",
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
        <section className="Debt-Widget">
            <div className="Widget-Container">
                <div className="box-left">
                    <span className="title">{data.title}</span>
                    <span className="counter">
                        {/* {data.isMoney && "R"} {data.amount} */}
                    </span>
                </div>
                <div className="box-right">
                    <span className="debt-icon">{data.icon}</span>
                    <div className="persentage">R{diff}</div>
                </div>
            </div>
        </section>
    )
}

export default Widget