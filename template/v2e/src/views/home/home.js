export default {
    name: 'Home',

    data() {
        return {
            showloginOut: true
        }
    },

    created () {
        this.showloginOut = !!this.$route.query.type
    }
}