// erro se
// falso
// é um array vazio
// é uma string vazia
function existsOrError(value, msg){
    if(!value) throw msg
    if(Array.isArray(value) && value.length == 0) throw msg
    if(typeof value === 'string' && !value.trim()) throw msg
}

// contrário da existsOrError
function notExistsOrError(value, msg){
    try {
        existsOrError(value, msg)
    } catch(msg) {
        return
    }
    throw msg
}

function equalsOrError(valueA, valueB, msg){
    if(valueA != valueB) throw msg
}

function isNotPositiveInteger(value) {
    return !(typeof value === 'number' && value > 0);
}

module.exports = {existsOrError, notExistsOrError, equalsOrError, isNotPositiveInteger}