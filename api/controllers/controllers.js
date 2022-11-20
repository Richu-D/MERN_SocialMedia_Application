const client = (req,res)=>{
    res.send("client");
};

const admin = (req,res)=>{
    res.send("admin");
};


export { admin , client };

