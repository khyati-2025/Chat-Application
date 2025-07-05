const user = localStorage.getItem("user");
       if(!user){
            alert("Please create an account Or login the account");
            window.location.href = "http://localhost:2000/securityPage.html"
        };

            
        const readUser = fetch(`http://localhost:2000/api/v1/${user}`);

            document.getElementById('send-button').addEventListener('click', async function(e) {
                e.preventDefault();
                try{
                    const typingDiv = document.getElementById("typing");
                    const textInput = document.getElementById("text-input").value.trim(); 

                    const res = await fetch(`http://localhost:2000/api/v1/message/${user}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({user: user , message: textInput})
                    });
                    const result = await res.json();

                    const sender = document.createElement('div');
                    sender.className = "text-sender";
                    sender.textContent = textInput;
                    sender.innerHTML = textInput;
                    typingDiv.appendChild(sender);

                }catch (error) {
                    console.error(error);
                    alert("Error occures : ", error)
                }
            })

        