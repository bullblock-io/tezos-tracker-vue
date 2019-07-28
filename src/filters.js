import Vue from "vue"
import moment from "moment";

const MAX_HASH_LENGTH = 20
const XTZ = 1000000;


Vue.filter("bignum", function (num) {
    const str = Array.from(num.toString()).reverse()
    let result = [];
    for (let i = 0; i < str.length; i++) {
        if ((i % 3) == 0) {
            result.push(" ");
        }
        result.push(str[i]);
    }
    return result.reverse().join("");
})
Vue.filter("timeformat", function (ts, format) {
    return moment(Number(ts) * 1000).format(format);
});

Vue.filter("longhash", function (hash, length) {
    const l = length || MAX_HASH_LENGTH;
    if (hash.length > l) {
        return hash.slice(0, l) + "...";
    }
    return hash;
});

Vue.filter("tezos", function (amount) {
    if (amount > 0) {
        return (amount / XTZ) + " XTZ"
    }
    return "0 XTZ";
    //return amount + "ꜩ";
});
