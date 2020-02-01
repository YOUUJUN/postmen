<template>

    <div class="main-container" id="menu">

        <div>
            <button class="btn" v-on:click="actPost()">邮件推送程序启动！！</button>
            <button class="btn" v-on:click="stopPost()">邮件推送程序关闭！！</button>
            <button class="btn" v-on:click="send()">发送邮件！！</button>
        </div>

        <div class="data-container">

            <div class="data-item" v-for="data in buffGatherData">
                <div class="name">
                    <span>名称：</span><span>{{data.name}}</span>
                </div>
                <div class="info">
                    <span>性价比：</span><span>{{data.costPerformance}}</span>
                </div>
                <div class="info">
                    <span>buff历史价格：</span><span>{{data.historyPrices}}</span>
                </div>
                <div class="info">
                    <span>成本：</span><span>{{data.cost}}</span>
                </div>
                <div class="info">
                    <span>steam价格：</span><span>{{data.steamPrice}}</span>
                </div>
                <div class="info">
                    <span>差价：</span><span>{{data.difference}}</span>
                </div>
                <div class="info">
                    <span>销售量：</span><span>{{data.buyNum}}</span>
                </div>
                <div class="info">
                    <span>预估利润：</span><span>{{data.buffProfits}}</span>
                </div>
                <button class="btn" v-on:click="getName(data.name)">复制名称</button>
            </div>


        </div>


    </div>

</template>

<style>

    @import "../../assets/css/component.css";

    .btn {
        margin: 4px;
    }


    .main-container{
        background-color: #f4f5f5;
        margin:8px;
    }

    .data-container {
        margin: 10px auto;
    }

    .response-info {
        color: red;
        font-size: 15px;
        margin: 4px 0;
    }

    .data-item {
        background: #eee;
        padding: 5px 10px;
        font-size: 14px;
        border: 1px solid #ddd;
        margin-bottom: 6px;
    }

    .name {
        font-size: 15px;
        font-weight: 600;
    }

    .info {
        color: rgba(0, 0, 0, 0.7);
    }


</style>

<script>
    export default {
        data() {
            return {
                name: 'youjun',
                actPage : 0,
                buffGatherData : []
            };
        },

        methods : {
            actPost () {
                this.$axios({
                    url : "/actPost",
                    method: 'POST'
                }).then(msg => {
                    var msg = msg.data;
                    alert(msg.message);
                }).catch(err => {
                    console.log(err);
                })
            },

            stopPost (){
                this.$axios({
                    url : "/stopPost",
                    method: 'POST'
                }).then(msg => {
                    var msg = msg.data;
                    alert(msg.message);
                }).catch(err => {
                    console.log(err);
                })
            },

            send (){
                this.$axios({
                    url : "/sendMail",
                    method: 'POST'
                }).then(msg => {
                    var msg = msg.data;
                    alert(msg.message);
                }).catch(err => {
                    console.log(err);
                })
            }

        }
    };
</script>
