import React from 'react';
import CustomSelectorWithInput from './component/CustomSelectorWithInput';
import CustomClock from './component/CustomClock';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {fromCountry: -1, fromCity: -1, toCountry: -1, toCity: -1, time: new Date()};

    this.getTimeZoneIncrement.bind(this);
  }

  render() {
    const fromCountry = this.props.countriesWithCities[this.state.fromCountry];
    const toCountry = this.props.countriesWithCities[this.state.toCountry];

    const fromCity = fromCountry && fromCountry.cities ? fromCountry.cities[this.state.fromCity] : undefined;
    const toCity = toCountry && toCountry.cities ? toCountry.cities[this.state.toCity] : undefined;

    const fromTimeIncrement = this.getTimeZoneIncrement(fromCountry, fromCity);
    const toTimeIncrement = this.getTimeZoneIncrement(toCountry, toCity);

    const fromPointTime = new Date(this.state.time.getTime() + fromTimeIncrement);
    const toPointTime = new Date(this.state.time.getTime() + toTimeIncrement);

    const timeDiff = Math.floor((toTimeIncrement - fromTimeIncrement) / 1000);
    const timeDiffHour = Math.floor(timeDiff / 3600);
    const timeDiffMinute = Math.floor(Math.abs(timeDiff / 60) % 60);

    const countryNames = this.props.countriesWithCities.map(x => x.name);

    const fromCountryCityNames = fromCountry && fromCountry.cities 
      ? fromCountry.cities.map(x => x.name) : undefined;

    const toCountryCityNames = toCountry && toCountry.cities 
      ? toCountry.cities.map(x => x.name) : undefined;

    return (
      <div className='d-flex flex-column vh-100'>
        <div className='align-self-center my-2' style={{fontSize: '4em'}}>If you want to travel</div>
        <div className='d-flex flex-row flex-grow-1 w-100 my-2'>
          <div className='d-flex flex-column justify-content-center align-items-center w-50'>
            <div className='text-center' style={{fontSize: '4em'}}>from</div>
            <div className='d-flex flex-row'>
              <CustomSelectorWithInput objects={countryNames} placeholder='Select a country' 
                onSelected={v => this.setState({fromCountry: v, fromCity: -1})} />
              <div className='mx-3'></div>
              <div className={`${fromCountryCityNames ? '' : 'collapse'}`}>
                <CustomSelectorWithInput objects={fromCountryCityNames ?? []} placeholder='Select a city' 
                  onSelected={v => this.setState({fromCity: v})} />
              </div>
            </div>
            <div className={`d-flex flex-column${fromTimeIncrement ? '' : ' invisible'}`}>
              <CustomClock utcTime={this.state.time} time={fromPointTime} />
            </div>
          </div>
          <div className='h-100 vr' />
          <div className='d-flex flex-column justify-content-center align-items-center w-50'>
            <div className='align-self-center' style={{fontSize: '4em'}}>to</div>
            <div className='d-flex flex-row'>
              <CustomSelectorWithInput objects={countryNames} placeholder='Select a country' 
                onSelected={v => this.setState({toCountry: v, toCity: -1})} />
              <div className='mx-3'></div>
              <div className={`${toCountryCityNames ? '' : 'collapse'}`}>
                <CustomSelectorWithInput objects={toCountryCityNames ?? []} placeholder='Select a city' 
                  onSelected={v => this.setState({toCity: v})} />
              </div>
            </div>
            <div className='d-flex flex-column'>
              <div className={`${toTimeIncrement ? '' : 'invisible'}`}>
                <CustomClock utcTime={this.state.time} time={toPointTime} />
              </div>
            </div>
          </div>
        </div>
        <div className={`align-self-center my-2 ${fromTimeIncrement && toTimeIncrement ? '' : ' collapse'}`} style={{fontSize: '4em'}}>
          {`the time difference would be ${timeDiffHour} hours ${timeDiffMinute} minutes.`}
        </div>
      </div>
    );
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({time: new Date()});
    }, 1000);
  }

  getTimeZoneIncrement(country, city) {
    if (city) {
      return city.timeZoneIncrement;
    }

    return country ? country.timeZoneIncrement : undefined;
  }
}

export default App;
