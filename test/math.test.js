const {calcTip,fahrenheitToCelsius,celsiusToFahrenheit} = require('../src/math')

test('Should calulate total with tip',()=>{
    const total = calcTip(10, .3)
    expect(total).toBe(13)

    // if(total!=13){
    //     throw new Error('Total tip should be 13. Got '+total)
    // }

})

test('Should convert 32 F to 0 C',()=>{
    const temp = fahrenheitToCelsius(32)
    expect(temp).toBe(0)
})


test('Should convert 0 C to 32 F',()=>{
    const temp = celsiusToFahrenheit(0)
    expect(temp).toBe(32)
})


test('Async Test',(done)=>{
    setTimeout(()=>{
        expect(1).toBe(1)
        done()
    },2000)   
})
