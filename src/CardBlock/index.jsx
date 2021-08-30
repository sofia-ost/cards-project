import { useState, useEffect } from "react";
import { Card } from "../Card";
import { Modal } from "../Modal";
import Spinner from "../static/images/spinner.svg";

import "./style/index.scss";

export const CardBlock = () => {

    const [modalActive, setModalActive] = useState(false);
    const [cardData, setCardData] = useState({})
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://run.mocky.io/v3/b7d36eea-0b3f-414a-ba44-711b5f5e528e")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setItems(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, []);

    let cheapestProduct; 
    items.reduce((prev, next, index, array) => {
        cheapestProduct = array.find(item => item.price === Math.min(prev, next.price))
        return next.price;
    }, 0)

    const handleChange = () => {
        setModalActive(true)
        setCardData(cheapestProduct)
    }

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return (
            <div className="loading">
                <img src={Spinner} alt="spinner" />
            </div>
        )
    } else {
        return (
            <div className="cards-block">
                <div className="container">
                    <div className="cards-block__body">
                        {items.map((item, index) => {
                            return (
                                <Card setModalActive={setModalActive} setCardData={setCardData} value={item} key={index} />
                            )
                        })}
                    </div>
                    <div className="cards-block__footer">
                        <button className="button button--big" onClick={handleChange} >
                            Buy cheapest
                        </button>
                    </div>
                    <Modal active={modalActive} setActive={setModalActive} result={cardData}/>
                </div>
            </div>
        )
    }
}