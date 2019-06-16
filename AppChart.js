import { html, LitElement, css } from 'https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module';
import 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.bundle.min.js'

class AppChart extends LitElement {

    // static get styles() {
    //     return [css`
    //         canvas {
    //             width:1500px;
    //             height:1500px;
    //         }`];
    //   } 

    firstUpdated(changedProperties) {
        var ctx = this.shadowRoot.querySelector('#myChart').getContext('2d');

        // these are end values, above superior is olympic
        var superior =      [ 70, 70, 65, 61, 56, 50 ].map( sup => VO2Max2Meters(sup));
        var excellent =     [ 55.9, 52.4, 49.4, 48.0, 45.3, 44.2 ].map( sup => VO2Max2Meters(sup));
        var good =          [ 39.0, 37.0, 35.7, 32.9, 31.5, 30.3 ].map( sup => VO2Max2Meters(sup));
        var average =       [ 35.0, 33.0, 31.5, 29.0, 27.0, 24.5 ].map( sup => VO2Max2Meters(sup));
        var poor =          [ 31.0, 29.0, 27.0, 24.5, 22.8, 20.2 ].map( sup => VO2Max2Meters(sup));
        var veryPoor =      [ 25.0, 23.6, 22.8, 21.0, 20.2, 17.5 ].map( sup => VO2Max2Meters(sup));
        var dead =          [ 17.0, 17.0, 17.0, 17.0, 17.0, 17.0 ].map( sup => VO2Max2Meters(sup));
        
        

        function metersToVO2Max(value){
            return Math.round((value - 504.9) / 44.73)
        }
        
        function VO2Max2Meters(value){
            return Math.round(value*44.73 + 504.9)
        }
        

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'Dead',
                        data: dead,
                        borderColor: "#000000",
                        backgroundColor : "#000000",
                    },
                    {
                        label: 'Very poor',
                        data: veryPoor,
                        borderColor: "#BF001D",
                        backgroundColor : "#BF001D",
                    },
                    {
                        label: 'Poor',
                        data: poor,
                        borderColor: "#C43300",
                        backgroundColor : "#C43300",
                    },
                    {
                        label: 'Average',
                        data: average,
                        borderColor: "#C98900",
                        backgroundColor : "#C98900",
                    },
                    {
                        label: 'Good',
                        data: good,
                        borderColor: "#B9CE00",
                        backgroundColor : "#B9CE00",
                    },        
                    {
                        label: 'Excellent',
                        data: excellent,
                        borderColor: "#90D100",
                        backgroundColor : "#90D100",
                    },
                    {
                        label: 'Superior',
                        data: superior,
                        borderColor: "#0DD900",
                        backgroundColor : "#0DD900",
                    }        
                    
                ],
            },
            options: {
                responsive: false,
                maintainAspectRatio: true,
                tooltips: {
                    mode: 'nearest',
                    intersect: false,
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var index = tooltipItem.datasetIndex
                            var prevIndex = tooltipItem.datasetIndex == 0 ? undefined : tooltipItem.datasetIndex -1
                            
                            var max = ''
                            var vo2Max = ''
                            if(index ) {
                                max = data.datasets[index].data[tooltipItem.index] 
                                vo2Max = metersToVO2Max(max)
                            }

                            var min = ''
                            var vo2MaxMin = ''
                            if(prevIndex) {
                                min = data.datasets[prevIndex].data[tooltipItem.index] 
                                vo2MaxMin = metersToVO2Max(min)
                            }
                            
                            return 'Range: '  + min + ' - ' + max + '  VO2Max: ' + vo2MaxMin + ' - ' + vo2Max
                        },
                        //footer: function(tooltipItem, data) { return 'Total: 100 planos.'; }
                    }
                  },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Male runner\'s age'
                        },
                        type: 'category',
                        labels: ['15', '25', '35', '45', '55', '65'],
                        
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Cooper\'s test Meters in 12 minutes'
                        },
                        ticks: {
                            min : 1200,
                            max : 3400,
                            stepSize: 100,
                            
                        }
                    }]
                }, 
            }
        });

    }

    

    render() {
        return html`
    <div>
        <canvas id="myChart" width="1000" ></canvas>
    </div>
    
    `;
    }
}

customElements.define('app-chart', AppChart);
