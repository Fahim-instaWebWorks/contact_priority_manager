import logo from "./logo.svg";
import "./App.css";
import Contact_priority_table from "./components/Contact_priority_table";
import { useEffect, useState } from "react";
const ZOHO = window.ZOHO;

function App() {
  const [zohoLoaded, setZohoLoaded] = useState(false);
  const [recordId, setRecordId] = useState();
  const [moduleName, setModuleName] = useState();
  const [data,setData] = useState()

  async function initZoho() {
    ZOHO.embeddedApp.on("PageLoad", async function (data) {
      console.log(data);
      setRecordId(data.EntityId[0]);
      setModuleName(data.Entity);
    });
    ZOHO.embeddedApp.init().then(() => {
      setZohoLoaded(true);
    });
  }

  useEffect(() => {
    initZoho();
  }, []);

  useEffect(() => {
    // fetchTemplateList();
    if (zohoLoaded) {
      ZOHO.CRM.API.getAllRecords({
        Entity: "Deals",
        sort_order: "asc",
        per_page: 200,
        page: 1,
      }).then(function (d) {
        console.log(d?.data);
        setData(d?.data)
      });
    }
  }, [zohoLoaded]);

  return (
    <div>
      <Contact_priority_table sampleData={data}/>
      {/* <Test /> */}
    </div>
  );
}

export default App;
