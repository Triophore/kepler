module.exports = {
    method: 'GET',
    path: '/get',
    handler: async(request, h) => {

        var d = await h.getModel('user');
        //console.log(d);
        return d.paginate().then({});
    }
}

module.exports = {
    method: 'GET',
    path: '/get1',
    options:{auth:false},
    handler: async(request, h) => {

        var d = await h.getModel('user');
        //console.log(d);

        h.socket_io.emit("fromurl","hello")
        return "from get 2";
    }
}