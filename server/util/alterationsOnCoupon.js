function foundCoupon(data) {
    if(Object.keys(data).length) return true;
    else return false;
}

function calculateUptoDiscount(totalAmt, perDect, maxPerPrice) {
    let deductionAmt = (totalAmt * perDect)/100;
    if(deductionAmt < maxPerPrice) return deductionAmt;
    else return maxPerPrice;
}

function checkOnCouponData(couponData, totalAmt) {
    return new Promise((resolve, reject) => {
        if(foundCoupon(couponData)){
            console.log("1");
            let {typeOfCode, minAmt, priceDeduct, percentDeduct, maxPercent} = couponData;
            if(typeOfCode === 'flat'){
                console.log("2");
                if(minAmt < totalAmt){
                    console.log("3");
                    resolve({data: priceDeduct});
                }
                else {
                    console.log("4");
                    let amt = minAmt - totalAmt;
                    reject({message: `Add this much more amount ${amt} to apply this coupon.`})
                }
            }
            else {
                console.log("5");
                if(minAmt < totalAmt){
                    console.log("6");
                    let finalPrice = calculateUptoDiscount(totalAmt, percentDeduct, maxPercent);
                    resolve({data: finalPrice});
                }
                else {
                    console.log("7");
                    let amt = minAmt - totalAmt;
                    reject({message: `Add this much more amount ${amt} to apply this coupon.`})
                }
            }
        }
        else {
            console.log("8");
            reject({message: "No Coupon found !!"});
        }
    })
}

module.exports = checkOnCouponData;