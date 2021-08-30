import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

type currencyCodeType = [
  {ccy: string | null, 
  base_ccy: string | null, 
  buy: number | null, 
  sale: number | null}
]

const App = () => {

  const [currencyCode, setCurrencyCode] = useState <currencyCodeType>([{ccy:null, base_ccy:null, buy:null, sale:null}]);
  const [currency1Value, setCurrency1Value] = useState <number | null> (1);
  const [course, setCourse] = useState<number | null>()
  const [result, setResult] = useState<number | null>()

  useEffect(()=> {
    axios.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5").then(
      (resp) => {
        const ccy = resp.data;
        setCurrencyCode(ccy);
        setCourse(ccy[0].buy);        
      }
    )
  }, [])

  useEffect(()=>{
    if(currency1Value && course)
    setResult(currency1Value*course)
    else{
      setResult(null)
    }
  }, [currency1Value, course])

  const handlerCurrency = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setCurrency1Value(+e.currentTarget.value);
  }

  return (
    <div className="wrapper">
      <h1 className="p-3 text-center">Конвертер валют UAN</h1>
      <div className="">
        <select className="form-select form-select-lg mb-3" defaultValue={'DEFAULT'} onChange={(e)=>{setCourse(+e.currentTarget.value)
        }}>
        <option value="DEFAULT" disabled>Выберите валюту</option>
          {currencyCode.map((currency, index)=>(
            currency.buy && <option key={index} value={currency.buy}>{currency.ccy}</option>  
          ))}
        </select>
      </div>
      <div className="form">
        <input type="text" placeholder={'Введиет значение'} className="form-control" value={currency1Value ? currency1Value: ''} onChange={handlerCurrency}/>
        <button className="btn btn-primary btn-text" disabled>Текущий курс: {course}</button>
        <button className="btn btn-primary btn-text" disabled>{result && result + ' грн'}</button>
      </div>
      <div>
      </div>
    </div>
  )
}

export default App;
