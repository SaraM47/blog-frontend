# Moment 3 - Single Page Application

Detta projekt är en Single Page Application utvecklad med React och TypeScript. Applikationen kommunicerar med ett egenutvecklat backend-API som hanterar autentisering med JSON Web Tokens samt fullständig CRUD-funktionalitet för blogginlägg. Frontend är byggt med Vite och React och är publicerat på Netlify. Routing hanteras med React Router v6, vilket möjliggör navigering mellan olika vyer utan att sidan laddas om. Autentiseringstillstånd hanteras med React Context API. Kommunikation med backend sker via Fetch API och inkluderar credentials för att stödja HTTP-only cookies.

Backend är implementerat med Fastify och använder MongoDB Atlas som databas via Mongoose är publicerat på Render. Autentisering sker med JSON Web Tokens som lagras i HTTP-only cookies. Skyddade endpoints valideras genom middleware innan åtkomst ges till administrativ funktionalitet.
- Länk till Backend-API repo: [Backend-repo](https://github.com/SaraM47/blog-backend). 

## Autentisering

Autentisering implementeras med JWT som lagras i en HTTP-only cookie. När en användare loggar in via /auth/login genererar backend en signerad token som skickas tillbaka och lagras som cookie. Skyddade endpoints kräver en giltig token och valideras via middleware. Frontend kontrollerar användarens inloggningsstatus genom anrop till /auth/me. Användningen av HTTP-only cookies innebär att token inte är åtkomlig via JavaScript, vilket minskar risken för XSS-relaterade angrepp.

## Funktionalitet

Publik del

* Lista alla inlägg

* Visa enskilt inlägg via dynamisk route (/posts/:id)

* Sidorna fungerar utan inloggning

Inloggning

* JWT-baserad autentisering

* Login-sida

* Navigationsmeny uppdateras beroende på inloggningsstatus

Administrativ del

* Skapa inlägg

* Uppdatera inlägg

* Ta bort inlägg

* Bekräftelsemodal vid borttagning

* Toast-notifikationer vid CRUD-operationer

## Backend-API

Backend exponerar följande endpoints. Skyddade endpoints kräver en giltig JWT-cookie:

Autentisering:

* POST /auth/register

* POST /auth/login

* POST /auth/logout

* GET /auth/me

Inlägg:

* GET /posts

* GET /posts/:id

* POST /posts

* PUT /posts/:id

* DELETE /posts/:id

## Starta lokalt 
Frontend:
Steg 1: Navigera till mappen
```bash
cd blog-frontend
```

Steg 2: Installera beroenden
```bash
npm install
```

Steg 3: Starta utvecklingsservern
```bash
npm run dev
```

Backend:

Steg 1: Navigera till mappen

```bash
cd blog-backend
```

Steg 2: Installera beroenden
```bash
npm install
```

Steg 3: Skapa en .env-fil

Lägg till följande variabler som beskrivs nedan:
```bash
PORT=...
MONGO_URI=...
JWT_SECRET=...
CLIENT_ORIGIN=http://localhost:5173
```

Steg 4: Starta utvecklingsservern
```bash
npm run dev
```