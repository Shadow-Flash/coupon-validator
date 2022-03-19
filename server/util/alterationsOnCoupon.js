function foundCoupon(data) {
    if(data !== null) return true;
    else return false;
}

function calculateUptoDiscount(totalAmt, perDect, maxPerPrice) {
    let deductionAmt = (totalAmt * perDect)/100;
    if(deductionAmt < maxPerPrice) return deductionAmt;
    else return maxPerPrice;
}

function getExactDate(mentionDate) {
    let date = new Date(mentionDate).getFullYear()+'-'+0+(new Date(mentionDate).getMonth()+1)+'-'+new Date(mentionDate).getDate();
    return date;
}

function isExpired(endDate) {
    let currentDate = getExactDate(Date.now());
    endDate = getExactDate(endDate);
    return currentDate > endDate;
}

function checkOnCouponData(couponData, totalAmt) {
    return new Promise((resolve, reject) => {
        if(foundCoupon(couponData)){
            let {typeOfCode, minAmt, priceDeduct, percentDeduct, maxPercent, ed} = couponData;
            if(!isExpired(ed)){
                if(typeOfCode === 'flat'){
                    if(minAmt <= totalAmt){
                        resolve({data: priceDeduct});
                    }
                    else {
                        let amt = minAmt - totalAmt;
                        reject({message: `Add ${amt} more amount to apply this coupon.`})
                    }
                }
                else {
                    if(minAmt <= totalAmt){
                        let finalPrice = calculateUptoDiscount(totalAmt, percentDeduct, maxPercent);
                        resolve({data: finalPrice});
                    }
                    else {
                        let amt = minAmt - totalAmt;
                        reject({message: `Add ${amt} more amount to apply this coupon.`})
                    }
                }
            }
            else {
                reject({message: `Coupon ${couponData.code} is expired !!`});
            }
        }
        else {
            reject({message: `No Coupon found !!`});
        }
    })
}

module.exports = checkOnCouponData;