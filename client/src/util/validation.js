export function validateFormInput(errors, couponData, type, date = null) {
    let name = couponData[0];
    let value = couponData[1].value;
    let currentDate = new Date(Date.now()).getFullYear()+'-'+0+(new Date(Date.now()).getMonth()+1)+'-'+new Date(Date.now()).getDate();
    const codeRegex = RegExp(/^[a-zA-Z0-9]*$/);
    switch(name) {
        case 'typeOfCode':
            errors[name] = !['flat','upto'].includes(value) ? "Not a valid coupon type!" : "";
            break;

        case 'code':
            if (value.length > 0) {
                if (value.length < 4)
                    errors[name] = "Length of code should be greater than 4";
                else if (value.length > 14)
                    errors[name] = "Length of code should be Less than 14";
                else if (!codeRegex.test(value))
                    errors[name] = "Please enter a valid code !";
                else
                    errors[name] = "";
            } else {
                errors[name] = "Length of code should be greater than 4";
            }
            break;

        case 'desc':
            errors[name] = value.length > 100 ? "Length of description should be less than 100 characters" : "";
            break;

        case 'priceDeduct':
            errors[name] = value < 100 && type === 'flat' ? "Price to be deduct should be greater than 100" : "";
            break;

        case 'sd':
            errors[name] = value === "" ? "Start date is required" : value < currentDate ? "Start date cannot be a past time" : "";
            break;

        case 'ed':
            errors[name] = value === "" ? "End date is required" : value <= date ? "End date cannot be less than or equal to Start date" : "";
            break;

        case 'minAmt':
            errors[name] = value === "" ? "Minimum amount of cart can't be empty" : value <= 100 ? "Minimum amount should be greater than 100" : "";
            break;

        case 'percentDeduct':
            errors[name] = (value === "" || value < 5 || value > 100) && type === 'upto' ? "Percent discount should be greater than 5 and less than 100" : "";
            break;

        case 'maxPercent':
            errors[name] = (value === "" || value < 500) && type === 'upto' ? "Maximum discount amount should be greater than 500" : "";
            break;
    }
}