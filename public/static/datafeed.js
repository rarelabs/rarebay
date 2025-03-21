class Datafeed {
    constructor(config) {
      this.config = config;
    }
  
    onReady(callback) {
      setTimeout(() => callback({
        supports_search: true,
        supports_group_request: false,
        supports_marks: false,
        supports_timescale_marks: false,
        supported_resolutions: ['1', '5', '15', '30', '60', '1D']
      }), 0);
    }
  
    getBars(symbolInfo, resolution, from, to, onResult) {
      const bars = this.config.dataReady()
        .filter(bar => bar.time >= from * 1000 && bar.time <= to * 1000)
        .map(bar => ({
          time: Math.floor(bar.time / 1000),
          open: bar.open,
          high: bar.high,
          low: bar.low,
          close: bar.close
        }));
      onResult(bars, { noData: bars.length === 0 });
    }
  
    resolveSymbol(symbolName, onResolve) {
      onResolve(this.config.resolveSymbol());
    }
  }
  
  export default Datafeed;