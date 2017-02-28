var bella = {
    prop: function(value) {
        function gettersetter(value) {
            var callbacks = []

            function prop() {
                if(arguments.length) {
                    var newValue = bella.immutable.clone(arguments[0])
                    var oldValue = bella.immutable.clone(value)
                    value = bella.immutable.clone(newValue)
                    callbacks.forEach(c => {
                        c(newValue, oldValue)
                    })
                }
                return value
            }

            prop.toJSON = function() {
                return value
            }

            prop.on = function(callback) {
                callbacks.push(callback)
            }

            return prop
        }

        return gettersetter(bella.immutable.clone(value))
    },
    immutable: {
        clone: function(original) {
            return JSON.parse(JSON.stringify(original))
        },
        push: function(original, item) {
            return [].concat(original, item)
        },
        pop: function(original) {
            return original.slice(0, -1)
        },
        shift: function(original) {
            return original.slice(1)
        },
        unshift: function(original, item) {
            return [].concat(item, original)
        },
        sort: function(original, compareFunction) {
            return original.concat().sort(compareFunction)
        },
        reverse: function(original) {
            return original.concat().reverse()
        },
        splice: function(original, start, deleteCount) {
            var _len = arguments.length
            var items = Array(_len > 3 ? _len - 3 : 0)
            for (var _key = 3; _key < _len; _key++) {
                items[_key - 3] = arguments[_key]
            }
            return [].concat(original.slice(0, start), items, original.slice(start + deleteCount))
        },
        remove: function(original, index) {
            return original.slice(0, index).concat(original.slice(index + 1))
        }
    },
    ajax: {
        get: function(url, callback){
            // Temporarily simulating backend
            const foods = [{"id":"1","name":"cheese","nutrients":[{"type":"protein","amount":22.87},{"type":"fat","amount":33.31},{"type":"carbohydrate","amount":3.09}],"description":"","portion":null},{"id":"2","name":"cheese, edam","nutrients":[{"type":"protein","amount":24.99},{"type":"fat","amount":27.8},{"type":"carbohydrate","amount":1.43}],"description":"","portion":null},{"id":"3","name":"cheese, mozzarella","nutrients":[{"type":"protein","amount":21.6},{"type":"fat","amount":24.64},{"type":"carbohydrate","amount":2.47}],"description":"","portion":null},{"id":"4","name":"cheese, parmesan","nutrients":[{"type":"protein","amount":35.75},{"type":"fat","amount":25.83},{"type":"carbohydrate","amount":3.22}],"description":"","portion":null},{"id":"5","name":"fish, herring","nutrients":[{"type":"protein","amount":16.39},{"type":"fat","amount":13.88},{"type":"carbohydrate","amount":0}],"description":"","portion":null},{"id":"6","name":"fish, mackerel","nutrients":[{"type":"protein","amount":18.6},{"type":"fat","amount":13.89},{"type":"carbohydrate","amount":0}],"description":"","portion":null},{"id":"7","name":"fish, tuna","nutrients":[{"type":"protein","amount":23.33},{"type":"fat","amount":4.9},{"type":"carbohydrate","amount":0}],"description":"","portion":null},{"id":"9","name":"cocoa butter oil","nutrients":[{"type":"protein","amount":0},{"type":"fat","amount":100},{"type":"carbohydrate","amount":0}],"description":"","portion":null},{"id":"10","name":"sunflower oil","nutrients":[{"type":"protein","amount":0},{"type":"fat","amount":100},{"type":"carbohydrate","amount":0}],"description":"","portion":null},{"id":"11","name":"fat, duck","nutrients":[{"type":"protein","amount":0},{"type":"fat","amount":99.8},{"type":"carbohydrate","amount":0}],"description":"","portion":null},{"id":"12","name":"fat, goose","nutrients":[{"type":"protein","amount":0},{"type":"fat","amount":99.8},{"type":"carbohydrate","amount":0}],"description":"","portion":null},{"id":"13","name":"margarine","nutrients":[{"type":"protein","amount":0.16},{"type":"fat","amount":80.71},{"type":"carbohydrate","amount":0.7}],"description":"","portion":null}]

            setTimeout(function() {
                const results = []
                foods.forEach(f => {
                    if(new RegExp('^' + url, 'gi').test(f.name)) results.push(f)
                })
                callback(results)
            }, 300)

            return

            var xhr = new XMLHttpRequest()

            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        var response = xhr.response ? JSON.parse(xhr.response) : null
                        callback(true, response)
                    }
                    else if (xhr.status === 404) {
                        callback(false, xhr.status)
                    }
                    else {
                        console.error('ajax get error')
                    }
                }
            }
            xhr.open('GET', url)
            xhr.send()
        },
        post: function(url, data, callback){
            var xhr = new XMLHttpRequest()

            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        var response = xhr.response ? JSON.parse(xhr.response) : null
                        callback(true, response)
                    }
                    else if(xhr.status === 404) {
                        callback(false, xhr.status)
                    }
                    else {
                        console.error('ajax post error')
                    }
                }
            }
            xhr.open('POST', url)
            xhr.setRequestHeader('Content-type', 'application/json')
            xhr.send(JSON.stringify(data))
        }
    }
}

module.exports = bella
