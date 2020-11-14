// import { sendCodeByPhone } from '@/api/login';
export default {
    data() {
        return {
            form: {
                mobile: '',
                code: '',
                country_code: {
                    phone_len: 11
                }
            },
            showCountdown: false,
            countDownTime: 60,
            again: false
        };
    },
    methods: {
        handleChangeRegion() {
            this.form.mobile = this.form.mobile.slice(0, this.form.country_code.phone_len);
        },
        sendCode() {
            const {
                mobile,
                country_code: { phone_code }
            } = this.form;
            if (!mobile) {
                this.$toast({ message: '请输入账号', icon: 'warning', duration: 1500, className: 'passport-toast' });
                return false;
            }
            if (phone_code == 86) {
                if (!/^1[3456789]\d{9}$/.test(mobile)) {
                    this.$toast({ message: '手机号格式错误', icon: 'warning', duration: 1500, className: 'passport-toast' });
                    return false;
                }
            } else {
                if (!/^\d{10}$/.test(mobile)) {
                    this.$toast({ message: '手机号格式错误', icon: 'warning', duration: 1500, className: 'passport-toast' });
                    return false;
                }
            }

            if (this.$refs.inputVal) this.$refs.inputVal.focus();
            if (!this.isCanClick) return false;
            this.isCanClick = false;
            sendCodeByPhone({ mobile, country_code: phone_code, product_line: 10012 })
                .then(respoonse => {
                    if (respoonse) {
                        this.handleCount();
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.isCanClick = true;
                });
        },
        handleCount() {
            this.showCountdown = true;
            let old_timer = setInterval(() => {
                this.countDownTime -= 1;
                if (this.countDownTime === 0) {
                    clearInterval(old_timer);
                    this.countDownTime = 60;
                    this.again = true;
                    this.showCountdown = false;
                }
            }, 1000);
        }
    }
};
