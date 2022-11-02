var groupid
window.addEventListener("DOMContentLoaded", () => {
    console.log("Hello")
    console.log(window.location.href)
    var x=window.location.href[window.location.href.length-1]
    //var y=window.localStorage.href[window.location.href.length-3]
    console.log("x is",x)
    var y=window.location.href[window.location.href.length-3];
    console.log("y is",y)
    groupid=x
    console.log(groupid)
    getmembers(x)
    getchat(x)
    
})

console.log("sadsadasfaf",groupid)

async function getmembers(groupid) {
    let token = localStorage.getItem("token");
    console.log(token)
    console.log("inside get members")
    try{
        var memberlist;
        var response1=await axios.get(`http://localhost:3000/getgroupmembers/${groupid}`, 
        {headers: { Authorization: token }})
        console.log(response1.data,"this is member listresponse1")
        memberlist=response1.data.data;
        console.log(memberlist,"member")
        var userlist=document.getElementById('userlist')
        var content1=''
        //var content2=''
        for(let i=0;i<memberlist.length;i++){
            console.log(memberlist[i].id,"--",response1.data.myuser.id,"---",memberlist[i].isadmin)
            if(memberlist[i].id==response1.data.myuser.id && memberlist[i].isadmin===true){
                console.log("inside if");
                content1=admin(memberlist)
                break;
            }
            else{
                for(let i=0;i<memberlist.length;i++){
                    content1+=`<p>${memberlist[i].userId}</p>`
                }
           }
        }
        console.log(content1)
        userlist.innerHTML=content1
       
        
        //allchat.innerHTML=content2
        console.log("Members",memberlist.length)
    }catch(err){
        console.log(err)
    }
    
}

function admin(memberlist){
    console.log(memberlist);
    var users=document.getElementById('userlist')
    
    var content1=''
    console.log(users)
    for(let i=0;i<memberlist.length;i++){
        console.log(memberlist[i].userId)
        content1+=`<p>${memberlist[i].userId}</p>
        <button>Make Admin</button><button>Remove Admin</button>
        <button onclick="removeuser(${groupid},${memberlist[i].userId})" id="sendbtn">Remove User</button>`
        
        console.log(content1)

    }
    content1+=`<div>
    <button onclick="adduser(${groupid})" id="sendbtn">Add User</button>
    </div>`;
    return content1


}











async function getchat(groupid){
    var token=localStorage.getItem("token")
    var response=await axios.get(`http://localhost:3000/getmessage/${groupid}`, { headers: {Authorization: token} });
    var chats=response.data.data
    console.log(chats,"chatsssssssssss")
    var allchat=document.getElementById('allchat')
    var content='';

    for(let i=0;i<chats.length;i++){
        content+=`<p>${chats[i].userId}------ ${chats[i].message}</p>`
        console.log(content)

    }
    content+=`<div><label>Enter your message: </label>
    <input type="text" id="message"><button onclick="sendchat(${groupid})" id="sendbtn">Send</button>
    </div>`;
    console.log(content)
    allchat.innerHTML=content

}

async function sendchat(groupid){
    var message=document.getElementById('message').value
    console.log(message,"this is message")
    var obj={
        message:message
    }
    var token=localStorage.getItem("token")
    console.log("inside send chat",groupid)
    try{
        var response=await axios.post(`http://localhost:3000/postmessage/${groupid}`, obj,{ headers: {Authorization: token} });
        console.log(response.data.data)    

    }
    catch(err){
        console.log(err,"eroor is--")
    }
}



function removeuser(groupid,userid){

}