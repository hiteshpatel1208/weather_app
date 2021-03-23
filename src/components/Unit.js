import React, { useEffect, useState } from 'react'

export default function Unit(props) {
    const [unit, setUnit] = useState(false)

    useEffect(() => {
        if (unit) {
            props.unitSetter('metric');
        } else {
            props.unitSetter('imperial');
        }
    }, [props, unit]);

    return (
        <>
            <div className="weather-app__unit-switch">
                <input
                    type="checkbox"
                    className="weather-app__unit-switch-checkbox"
                    name="weather-app__unit-switch"
                    id="weather-app__unit-switch"
                    checked={unit}
                    onChange={() => {
                        setUnit(prevUnit => !prevUnit)
                    }}
                />
                <label className="weather-app__unit-switch-label" htmlFor="weather-app__unit-switch">
                    <span className="weather-app__unit-switch-inner" />
                    <span className="weather-app__unit-switch-switch" />
                </label>
            </div>
        </>
    )
}
