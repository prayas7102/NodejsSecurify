# Generic-API-based-Web-programming

Generic notification system to send bulk text email. Technologies used: MERN, CKEditor for text area, calendar with react date-time picker and nodemailer & node-cron for sending/scheduling mail.

# Deployed
Apparently the deployed version is not supporting the post requests to database but on localhost it's successfuly executing (see video)
https://zesty-cendol-d7e43e.netlify.app/

# Installation
1. git clone https://github.com/prayas7102/Bulk-Email-Sender-NodeJs.git
2. npm i
3. cd frontend
4. npm i
5. cd ..
6. npm run dev

# Working Images

https://user-images.githubusercontent.com/71717433/212556468-4229f231-785d-4ea7-b1fe-77c54277bbc0.mp4

<img width="595" alt="image" src="https://user-images.githubusercontent.com/71717433/212556121-cb28360d-e362-4d6f-90f7-f5cbb751f6f5.png">
<img width="595" alt="image" src="https://user-images.githubusercontent.com/71717433/212556146-f11c2ff6-6219-48b7-aaf9-433c5067b741.png">
<img width="600" alt="image" src="https://user-images.githubusercontent.com/71717433/212556176-434cd8a7-7af3-4dc3-9d23-9def0c5cb0ff.png">
<img width="592" alt="image" src="https://user-images.githubusercontent.com/71717433/212556215-35348876-eb2e-4c8d-944f-0321b6c4013e.png">
<img width="579" alt="image" src="https://user-images.githubusercontent.com/71717433/212556247-9d73a437-6447-4eb5-bf17-f15a73ba4c48.png">


# .env requirements
EMAIL, PASSWORD, MONGO_URI
NODE_ENV="DEVELOPEMENT"
PORT="5000"
SMPT_HOST="smtp.gmail.com"
SMPT_PORT=465
SMPT_SERVICE="gmail"

# Category: 
Generic API based Web programming

# Assumptions:
1. Real email is not needed, if could be simulated on Web page just for demo purpose.
2. It should be small size emails <1 MB, no attachment.

Per Day emails: 500 

# Use cases: 
1. Design and build a bulk email notification system to draft, compile and send to email notification providers.
2. Bulk email should be based on pre-defined templates.
3. Bulk email alerts can be scheduled to send on a specific time.
4. Bulk emails should be prioritized and sent based on priority.
Example: system outage notification to all employees.

