import { Component } from 'react';

class ExtendFun extends Component{
    state = {
        anchorFilt: null,
        anchorDrop: null,
        pageNumber: 1,
        setStateProps: false,
        filterElement: null,
        rowNumber: 5,
        pageType:"404",
        filteredTableData: [],
        tableSemiFilteredData:[],
        tableData:[]
    }
    
 // ------ // Pops up filter options when clicked
    handleClick = (event) => {
        if(event.currentTarget.parentElement.className === "filter"){
            this.state.anchorFilt = event.currentTarget;
            // this.state.anchorFilt = event.currentTarget;
        }else{
            this.state.anchorDrop = event.currentTarget;
        }
    };
  
    handleClose = (info) => {
        // ------ // Removes pop-up filter options
        this.state = {...this.state,anchorFilt:null, anchorDrop: null};
        // ------ // Passes data to function
        this.handleFiltersEvents(info);    
    };

    handleReset = () =>{
        this.state = {...this.state,rowNumber:5,filterElement: null,pageNumber:1};
        document.querySelector(".searchBar").querySelector("input").value="";
        this.handleFiltersEvents("Reset");
    }


    handlePagination = (type) =>{
        let semiData = this.state.tableSemiFilteredData;

        if(type === "Next" && semiData.length > this.state.rowNumber && this.state.pageNumber < Math.ceil(semiData.length/this.state.rowNumber)){
            let filteredLength = this.state.filteredTableData.length*this.state.pageNumber;

            this.state ={...this.state,
                filteredTableData: semiData.slice(filteredLength,filteredLength+this.state.rowNumber),
                pageNumber: this.state.pageNumber+=1
            }
            this.handleFiltersEvents("AlreadyFiltered")

        }else if(type === "Prov" && this.state.pageNumber >= 2){
        let filteredLength = this.state.filteredTableData.length*this.state.pageNumber-this.state.rowNumber;

        this.state = {...this.state ,
            filteredTableData: semiData.slice(filteredLength-this.state.rowNumber,filteredLength),
            pageNumber: this.state.pageNumber-=1
        }
        this.handleFiltersEvents("AlreadyFiltered")
        }
    }

    handleFiltersEvents=(info)=>{
        console.log(info)
        if(info != "AlreadyFiltered"){
            let rageUpdatedAt = false,
            rangeKey = null,
            searchValue = null,
            uuid = false,
            volume = false,
            price = false,
            amount = false,
            refNumber = false,
            filter = false,
            filterElement = info==="Reset"?null:this.state.filterElement,
            filterRows = info==="Reset"?5:this.state.rowNumber;

            // ------// Types of actions to take for different Filters
            switch(true){
                case ["ASK","BTC/AUD & ETH/AUD","ETH/AUD","ETH/BTC","PROCESSED","REJECTED","REFUNDED"].includes(info):
                filterElement = info;
                this.state.filterElement = info;
                break;

                case /[0-9]/.test(Number(info)):
                filterRows = info;
                this.state.rowNumber = info;
                break;

                case info === "Search":
                // ------// Whenever a user starts searching the below executes
                searchValue = document.querySelector(".searchBar")
                .querySelector("input").value.replace(/\s/g, '').toLowerCase();
                // ------// Makes sure you have a range between something
                switch(true){
                    case searchValue.indexOf("-")>=0 && /[a-zA-Z]/.test(searchValue) !=true:
                    rangeKey="-"
                    break;
                    case searchValue.indexOf("to")>=0:
                    rangeKey="to"
                    break;
                    case searchValue.indexOf("&")>=0:
                    rangeKey="&"
                    break;
                    case searchValue.indexOf("and")>=0:
                    rangeKey="and"
                    break;
                }
                // ------// Sets the value of range in array
                if(rangeKey !== null){
                    rangeKey = searchValue.split(rangeKey);

                    let holdValue = Math.max(rangeKey[0],rangeKey[1])
                    rangeKey[0] = Math.min(rangeKey[0],rangeKey[1])
                    rangeKey[1] = holdValue;
                }
                break;
                default:
                    console.log("FAILED")
            }

            // ------// Rules for filters
            let rowCount = 0,
            rowOverFlow = 0,
            filterpage = false,
            overFlowData = [];
            
            if(this.state.tableData !== undefined){
                const filteredArray = this.state.tableData.trades.filter(filt => {

                // ------// Side , Status & TradingPair  - Filter
                if(this.state.pageType == "Trades"){ // Only works when on trades to prevent error
                    if(filt["side"] === filterElement || filt["tradingPair"]["symbol"] === filterElement){
                        filterpage = true;
                    }
                }

                if(filterpage || filterElement === null || filt["status"] === filterElement){
                    filter = true;
                }else{
                    filter = false;
                }

                // ------// rangeKey = null which means a users was never typing it; then do below
                if(rangeKey === null){
                    uuid = filt["uuid"].toLowerCase().indexOf(searchValue)>=0;

                    // ------// Check if its Trades or Withdraw page
                    if(this.state.pageType == "Withdraw"){ 
                        amount = filt["amount"].indexOf(searchValue)>=0;
                        refNumber = filt["bankReferenceNumber"].toLowerCase().indexOf(searchValue)>=0;
                    }else{ 
                        volume = filt["volume"].indexOf(searchValue)>=0;
                        price = filt["price"].indexOf(searchValue)>=0;
                    }

                // ------// Calculating range
                }else if((filt["updatedAt"] >= rangeKey[0] && filt["updatedAt"] <= rangeKey[1]) || filt["createdAt"] >= rangeKey[0] && filt["createdAt"] <= rangeKey[1]){
                    rageUpdatedAt = true;
                }else{ rageUpdatedAt = false; }

                // ------// restricts how many rows can be shown
                let perimeterCheck = false;
                if(rowCount < filterRows && filter){
                    perimeterCheck = true;rowCount++;
                }

                // Get table data that doesn't have restrictive row count for pagnation
                if(filter && (info!=="Search" || rageUpdatedAt || uuid || volume || price || amount || refNumber)){
                    overFlowData[rowOverFlow] = this.state.tableData.trades[rowOverFlow];
                    rowOverFlow++;
                }
                
                return(perimeterCheck && (info!=="Search" || rageUpdatedAt || uuid || volume || price || amount || refNumber))
                })

                this.state = {...this.state,filteredTableData:filteredArray,tableSemiFilteredData:overFlowData}
            }
        }
    }
}

const  ExtendFunctions = new ExtendFun();
export default ExtendFunctions