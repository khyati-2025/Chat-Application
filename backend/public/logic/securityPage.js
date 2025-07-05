        //Login
        document.getElementById('login').addEventListener('click', async function(){
           try{
                const username = document.getElementById('username').value;
                const pwd = document.getElementById('pwd').value;
                const res = await fetch("http://localhost:2000/api/v1/login", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    }, 
                    body: JSON.stringify({user : username, pwd: pwd})
                });
                const result = await res.json();
                alert(result.message);
               window.location.href = "http://localhost:2000/main.html";
           }
           catch (err) {
            console.log("Login error " ,err);
            alert("Invalid Credentials");
           }
        })

        //Sign-up
        function signUp() {
            const credentialsDiv = document.querySelector('.credentials');
            credentialsDiv.innerHTML = ''; // Clear existing login form

            // New Username
            const labelUser = document.createElement('label');
            labelUser.innerText = "New Username: ";
            const inputUser = document.createElement('input');
            inputUser.type = "text";
            inputUser.placeholder = "New Username";
            inputUser.id = "newUsername";

            // New Password
            const labelPwd = document.createElement('label');
            labelPwd.innerText = "New Password: ";
            const inputPwd = document.createElement('input');
            inputPwd.type = "password";
            inputPwd.placeholder = "New Password";
            inputPwd.id = "newPwd";

            // Confirm Password
            const labelConfirm = document.createElement('label');
            labelConfirm.innerText = "Confirm Password: ";
            const inputConfirm = document.createElement('input');
            inputConfirm.type = "password";
            inputConfirm.placeholder = "Confirm Password";
            inputConfirm.id = "confirmPwd";

            // Submit Button
            const createBtn = document.createElement('button');
            createBtn.innerText = "Create Account";
            createBtn.id = "createAccount";

            // Append to div
            credentialsDiv.appendChild(labelUser);
            credentialsDiv.appendChild(inputUser);
            credentialsDiv.appendChild(labelPwd);
            credentialsDiv.appendChild(inputPwd);
            credentialsDiv.appendChild(labelConfirm);
            credentialsDiv.appendChild(inputConfirm);
            credentialsDiv.appendChild(createBtn);


            document.getElementById('createAccount').addEventListener('click', async function() {
                try{
                        const newUser = document.getElementById('newUsername').value;
                        const newPwd = document.getElementById('newPwd').value;
                        const confirmPwd = document.getElementById('confirmPwd').value;

                        if(newPwd !== confirmPwd) {
                            alert("Passwords are not similar!!");
                        }
                        else{
                                const res = await fetch('http://localhost:2000/api/v1/sign-up', {
                                method: "POST", 
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json'
                                },
                                body: JSON.stringify({user: newUser, pwd: newPwd})
                            });
                            const result = await res.json();
                            alert("Created Account successfully");
                            window.location.href = "http://localhost:2000/main.html";
                            
                        }
                }catch (err) {
                    console.error(err);
                    alert("Invalid!!")
                }
            })
        }