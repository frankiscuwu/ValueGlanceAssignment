import React, { useState, useEffect } from "react";
import axios from "axios";

function AAPL() {
    const [data, setData] = useState<any[]>([]); // data from API
    const [loading, setLoading] = useState(true); // loading?
    const [sort, setSort] = useState({ key: "date", order: "desc" }); // sort default asc

    // table filters
    const [filters, setFilters] = useState({
        startYear: "",
        endYear: "",
        minRevenue: "",
        maxRevenue: "",
        minNetIncome: "",
        maxNetIncome: "",
    });

    const fake = [
        {
            date: "2024-09-28",
            symbol: "AAPL",
            reportedCurrency: "USD",
            cik: "0000320193",
            fillingDate: "2024-11-01",
            acceptedDate: "2024-11-01 06:01:36",
            calendarYear: "2024",
            period: "FY",
            revenue: 391035000000,
            costOfRevenue: 210352000000,
            grossProfit: 180683000000,
            grossProfitRatio: 0.4620634982,
            researchAndDevelopmentExpenses: 31370000000,
            generalAndAdministrativeExpenses: 0,
            sellingAndMarketingExpenses: 0,
            sellingGeneralAndAdministrativeExpenses: 26097000000,
            otherExpenses: 0,
            operatingExpenses: 57467000000,
            costAndExpenses: 267819000000,
            interestIncome: 0,
            interestExpense: 0,
            depreciationAndAmortization: 11445000000,
            ebitda: 134661000000,
            ebitdaratio: 0.3443707085,
            operatingIncome: 123216000000,
            operatingIncomeRatio: 0.3151022287,
            totalOtherIncomeExpensesNet: 269000000,
            incomeBeforeTax: 123485000000,
            incomeBeforeTaxRatio: 0.3157901467,
            incomeTaxExpense: 29749000000,
            netIncome: 93736000000,
            netIncomeRatio: 0.2397125577,
            eps: 6.11,
            epsdiluted: 6.08,
            weightedAverageShsOut: 15343783000,
            weightedAverageShsOutDil: 15408095000,
            link: "https://www.sec.gov/Archives/edgar/data/320193/000032019324000123/0000320193-24-000123-index.htm",
            finalLink:
                "https://www.sec.gov/Archives/edgar/data/320193/000032019324000123/aapl-20240928.htm",
        },
        {
            date: "2023-09-30",
            symbol: "AAPL",
            reportedCurrency: "USD",
            cik: "0000320193",
            fillingDate: "2023-11-03",
            acceptedDate: "2023-11-02 18:08:27",
            calendarYear: "2023",
            period: "FY",
            revenue: 383285000000,
            costOfRevenue: 214137000000,
            grossProfit: 169148000000,
            grossProfitRatio: 0.4413112958,
            researchAndDevelopmentExpenses: 29915000000,
            generalAndAdministrativeExpenses: 0,
            sellingAndMarketingExpenses: 0,
            sellingGeneralAndAdministrativeExpenses: 24932000000,
            otherExpenses: 382000000,
            operatingExpenses: 54847000000,
            costAndExpenses: 268984000000,
            interestIncome: 3750000000,
            interestExpense: 3933000000,
            depreciationAndAmortization: 11519000000,
            ebitda: 125820000000,
            ebitdaratio: 0.3282674772,
            operatingIncome: 114301000000,
            operatingIncomeRatio: 0.2982141227,
            totalOtherIncomeExpensesNet: -565000000,
            incomeBeforeTax: 113736000000,
            incomeBeforeTaxRatio: 0.2967400237,
            incomeTaxExpense: 16741000000,
            netIncome: 96995000000,
            netIncomeRatio: 0.2530623426,
            eps: 6.16,
            epsdiluted: 6.13,
            weightedAverageShsOut: 15744231000,
            weightedAverageShsOutDil: 15812547000,
            link: "https://www.sec.gov/Archives/edgar/data/320193/000032019323000106/0000320193-23-000106-index.htm",
            finalLink:
                "https://www.sec.gov/Archives/edgar/data/320193/000032019323000106/aapl-20230930.htm",
        },
        {
            date: "2022-09-24",
            symbol: "AAPL",
            reportedCurrency: "USD",
            cik: "0000320193",
            fillingDate: "2022-10-28",
            acceptedDate: "2022-10-27 18:01:14",
            calendarYear: "2022",
            period: "FY",
            revenue: 394328000000,
            costOfRevenue: 223546000000,
            grossProfit: 170782000000,
            grossProfitRatio: 0.4330963056,
            researchAndDevelopmentExpenses: 26251000000,
            generalAndAdministrativeExpenses: 0,
            sellingAndMarketingExpenses: 0,
            sellingGeneralAndAdministrativeExpenses: 25094000000,
            otherExpenses: 228000000,
            operatingExpenses: 51573000000,
            costAndExpenses: 275119000000,
            interestIncome: 2825000000,
            interestExpense: 2931000000,
            depreciationAndAmortization: 11104000000,
            ebitda: 130541000000,
            ebitdaratio: 0.3310467428,
            operatingIncome: 119437000000,
            operatingIncomeRatio: 0.302887444,
            totalOtherIncomeExpensesNet: -334000000,
            incomeBeforeTax: 119103000000,
            incomeBeforeTaxRatio: 0.3020404333,
            incomeTaxExpense: 19300000000,
            netIncome: 99803000000,
            netIncomeRatio: 0.2530964071,
            eps: 6.15,
            epsdiluted: 6.11,
            weightedAverageShsOut: 16215963000,
            weightedAverageShsOutDil: 16325819000,
            link: "https://www.sec.gov/Archives/edgar/data/320193/000032019322000108/0000320193-22-000108-index.htm",
            finalLink:
                "https://www.sec.gov/Archives/edgar/data/320193/000032019322000108/aapl-20220924.htm",
        },
        {
            date: "2021-09-25",
            symbol: "AAPL",
            reportedCurrency: "USD",
            cik: "0000320193",
            fillingDate: "2021-10-29",
            acceptedDate: "2021-10-28 18:04:28",
            calendarYear: "2021",
            period: "FY",
            revenue: 365817000000,
            costOfRevenue: 212981000000,
            grossProfit: 152836000000,
            grossProfitRatio: 0.4177935963,
            researchAndDevelopmentExpenses: 21914000000,
            generalAndAdministrativeExpenses: 0,
            sellingAndMarketingExpenses: 0,
            sellingGeneralAndAdministrativeExpenses: 21973000000,
            otherExpenses: -60000000,
            operatingExpenses: 43827000000,
            costAndExpenses: 256808000000,
            interestIncome: 2843000000,
            interestExpense: 2645000000,
            depreciationAndAmortization: 11284000000,
            ebitda: 120233000000,
            ebitdaratio: 0.3286697994,
            operatingIncome: 108949000000,
            operatingIncomeRatio: 0.2978237753,
            totalOtherIncomeExpensesNet: 258000000,
            incomeBeforeTax: 109207000000,
            incomeBeforeTaxRatio: 0.2985290459,
            incomeTaxExpense: 14527000000,
            netIncome: 94680000000,
            netIncomeRatio: 0.2588179336,
            eps: 5.67,
            epsdiluted: 5.61,
            weightedAverageShsOut: 16701272000,
            weightedAverageShsOutDil: 16864919000,
            link: "https://www.sec.gov/Archives/edgar/data/320193/000032019321000105/0000320193-21-000105-index.htm",
            finalLink:
                "https://www.sec.gov/Archives/edgar/data/320193/000032019321000105/aapl-20210925.htm",
        },
        {
            date: "2020-09-26",
            symbol: "AAPL",
            reportedCurrency: "USD",
            cik: "0000320193",
            fillingDate: "2020-10-30",
            acceptedDate: "2020-10-29 18:06:25",
            calendarYear: "2020",
            period: "FY",
            revenue: 274515000000,
            costOfRevenue: 169559000000,
            grossProfit: 104956000000,
            grossProfitRatio: 0.3823324773,
            researchAndDevelopmentExpenses: 18752000000,
            generalAndAdministrativeExpenses: 0,
            sellingAndMarketingExpenses: 0,
            sellingGeneralAndAdministrativeExpenses: 19916000000,
            otherExpenses: 87000000,
            operatingExpenses: 38755000000,
            costAndExpenses: 208314000000,
            interestIncome: 3763000000,
            interestExpense: 2873000000,
            depreciationAndAmortization: 11056000000,
            ebitda: 77344000000,
            ebitdaratio: 0.2817478098,
            operatingIncome: 66288000000,
            operatingIncomeRatio: 0.2414731435,
            totalOtherIncomeExpensesNet: 803000000,
            incomeBeforeTax: 67091000000,
            incomeBeforeTaxRatio: 0.2443983025,
            incomeTaxExpense: 9680000000,
            netIncome: 57411000000,
            netIncomeRatio: 0.2091361128,
            eps: 3.31,
            epsdiluted: 3.28,
            weightedAverageShsOut: 17352119000,
            weightedAverageShsOutDil: 17528214000,
            link: "https://www.sec.gov/Archives/edgar/data/320193/000032019320000096/0000320193-20-000096-index.htm",
            finalLink:
                "https://www.sec.gov/Archives/edgar/data/320193/000032019320000096/aapl-20200926.htm",
        },
    ];

    // GET
    /* useEffect(() => {
        axios
            .get(
                "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=ye7AXTZFVYOzdoeIBRwK7W2j7XIx5kX3"
            )
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                return <p>API error</p>;
            });
    }, []); */
    useEffect(() => {
        setData(fake);
        setLoading(false);
    }, []);

    // loading screen
    if (loading) return <p>awaiting API response</p>;

    const filteredData = data.filter((item) => {
        const withinDateRange =
            (!filters.startYear ||
                new Date(item.date) >= new Date(filters.startYear)) &&
            (!filters.endYear ||
                new Date(item.date) <= new Date(filters.endYear));
        const withinRevenueRange =
            (!filters.minRevenue || item.revenue >= filters.minRevenue) &&
            (!filters.maxRevenue || item.revenue <= filters.maxRevenue);
        const withinIncomeRange =
            (!filters.minNetIncome || item.netIncome >= filters.minNetIncome) &&
            (!filters.maxNetIncome || item.netIncome <= filters.maxNetIncome);

        return withinDateRange && withinRevenueRange && withinIncomeRange;
    });

    // Sort data by date
    const sortedData = [...filteredData].sort((a, b) => {
        const valueA = a[sort.key];
        const valueB = b[sort.key];
        if (typeof valueA === "string" && typeof valueB === "string") {
            return sort.order === "asc"
                ? valueA.localeCompare(valueB)
                : valueB.localeCompare(valueA);
        } else {
            return sort.order === "asc" ? valueA - valueB : valueB - valueA;
        }
    });

    // Toggle sort order
    const handleSort = (key: string) => {
        setSort((prevConfig) => ({
            key,
            order:
                prevConfig.key === key && prevConfig.order === "asc"
                    ? "desc"
                    : "asc",
        }));
    };

    // render filter box entries >> table
    return (
        <div className="container mx-auto">
            <div className="mb-4 sticky flex flex-wrap gap-4 justify-center">
                <input
                    type="number"
                    placeholder="Start Year (YYYY)"
                    value={filters.startYear}
                    onChange={(e) =>
                        setFilters({ ...filters, startYear: e.target.value })
                    }
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="End Year (YYYY)"
                    value={filters.endYear}
                    onChange={(e) =>
                        setFilters({ ...filters, endYear: e.target.value })
                    }
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="Min Revenue"
                    value={filters.minRevenue}
                    onChange={(e) =>
                        setFilters({ ...filters, minRevenue: e.target.value })
                    }
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="Max Revenue"
                    value={filters.maxRevenue}
                    onChange={(e) =>
                        setFilters({ ...filters, maxRevenue: e.target.value })
                    }
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="Min Net Income"
                    value={filters.minNetIncome}
                    onChange={(e) =>
                        setFilters({ ...filters, minNetIncome: e.target.value })
                    }
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="Max Net Income"
                    value={filters.maxNetIncome}
                    onChange={(e) =>
                        setFilters({ ...filters, maxNetIncome: e.target.value })
                    }
                    className="p-2 border rounded"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th
                                onClick={() => handleSort("date")}
                                className={`border px-4 py-2 cursor-pointer ${
                                    sort.key === "date" ? "font-bold" : ""
                                }`}
                            >
                                Date{" "}
                                {sort.key === "date"
                                    ? sort.order === "asc"
                                        ? "↑"
                                        : "↓"
                                    : "↑↓"}
                            </th>
                            <th
                                onClick={() => handleSort("revenue")}
                                className={`border px-4 py-2 cursor-pointer ${
                                    sort.key === "revenue" ? "font-bold" : ""
                                }`}
                            >
                                Revenue{" "}
                                {sort.key === "revenue"
                                    ? sort.order === "asc"
                                        ? "↑"
                                        : "↓"
                                    : "↑↓"}
                            </th>
                            <th
                                onClick={() => handleSort("netIncome")}
                                className={`border px-4 py-2 cursor-pointer ${
                                    sort.key === "netIncome" ? "font-bold" : ""
                                }`}
                            >
                                Net Income{" "}
                                {sort.key === "netIncome"
                                    ? sort.order === "asc"
                                        ? "↑"
                                        : "↓"
                                    : "↑↓"}
                            </th>
                            <th className="border px-4 py-2">Gross Profit</th>
                            <th className="border px-4 py-2">EPS</th>
                            <th className="border px-4 py-2">
                                Operating Income
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((item) => (
                            <tr key={item.date} className="text-center">
                                <td className="border px-4 py-2">
                                    {item.date}
                                </td>
                                <td className="border px-4 py-2">
                                    {item.revenue}
                                </td>
                                <td className="border px-4 py-2">
                                    {item.netIncome}
                                </td>
                                <td className="border px-4 py-2">
                                    {item.grossProfit}
                                </td>
                                <td className="border px-4 py-2">{item.eps}</td>
                                <td className="border px-4 py-2">
                                    {item.operatingIncome}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AAPL;
