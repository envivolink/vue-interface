import BaseClass from '../../Support/BaseClass';
import { extend } from '../../Helpers/Functions';

export default class Response extends BaseClass {
    constructor(data) {
        super(extend({
            date: new Date()
        }, data));
    }

    get data() {
        return this.$data;
    }

    set data(value) {
        this.$data = value;
    }

    get request() {
        return this.$request;
    }

    set request(value) {
        this.$request = value;
    }

    get date() {
        return this.$date;
    }

    set date(value) {
        this.$date = value;
    }
}