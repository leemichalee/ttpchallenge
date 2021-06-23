import React, {useState, useEffect} from "react";
import Pins from "./nyc_ttp_pins.json";
import wheel from "./wheel.gif";

function App(){

    const [pins, setPins] = useState(Pins.slice(0,12));
    const [loading, setLoading] = useState(false);
    const [n, setN] = useState(0);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll); 
    }, []);

    useEffect(() => {
        if (!loading) return;
        loadPins();
    }, [loading])

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setLoading(true);
    }

    function loadPins() {
        setTimeout(() => {
            if (pins.length < Pins.length) {
            setPins(Pins.slice(0, (pins.length + 12)));
            } else {
                let adding = pins.concat((Pins.slice(n, n+12)));
                setPins(adding);
                console.log(pins)
                if (n >= Pins.length) {
                    setN(0);
                } else {
                    setN(n+12)
                }
            }
            setLoading(false);
        }, 1000);
    }

    return(
        <div>
            <table>
            {pins.map(pin => (
                <tr key={pin.id} class="rows">
                <td class="images"><img src={pin.images.["236x"].url} alt="Pin"/></td>
                <td>
                    <h2>{pin.title}</h2><br/>
                    <p>{pin.description}</p><br/>
                    ❤️ {pin.repin_count}<br/>
                    {pin.pinner.username}
                </td>
                </tr>
            ))}
            </table>
            <img src={wheel} alt="Loading..."/>
        </div>
    )
}

export default App;