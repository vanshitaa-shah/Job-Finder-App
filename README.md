# Job-Finder-App
# Introduction

The Job Finder application is a platform designed to connect job seekers with job providers. Built using React, Redux, Firebase, and TypeScript, this application simplifies the job search process for users by offering a range of features and functionalities.​

With Job Finder, there are two main types of users: job providers and job seekers. Major Task of Job providers are to list the jobs and after receiving applications from various applicants, they can accept of reject them.

On the other hand, job seekers can browse through the various job listings posted by various providers. They have the option to apply for jobs by submitting their applications, including personal details and resumes. After any job status update from provider, applicant will get the mail.

## Live Link :

[Job-Finder](https://job-finder-969.netlify.app/all-jobs)

## Installation :

To install and run the Job Finder App, follow these steps:

1. Clone this repository to your local machine:

```
git clone https://github.com/vanshitaa-shah/Job-Finder-App.git
```

2. Navigate to the project directory:

```
cd job-finder-app
```

3. Install the dependencies:

```
npm install
```

4. Run the project

```
npm run dev
```

## Technology Overview :​

- React.js: React is a popular JavaScript library for building user interfaces. It provides a component-based approach to UI development. It allows for efficient rendering and updates, resulting in fast and responsive web applications.​

- TypeScript: It is a statically typed superset of JavaScript. It adds static typing, interfaces, and other advanced features to JavaScript. With TypeScript, we can catch errors early in the development process and enhance the maintainability and productivity of your codebase.​

- Redux: Redux is a state management library for JavaScript applications. It provides a predictable state container, allowing you to manage the application state in a centralized manner.​

- Firebase: It provides services such as database, storage, user authentication, and many more. With Firebase, you can develop a full-stack application without writing a single line of backend code.​

- Material UI: It includes a comprehensive collection of prebuilt components that are ready for use in production right out of the box.

- EmailJs: EmailJS is a service that helps to send emails using client-side applications like React, Vue, and Angular, with no server during configuration and setup.​

## Key Features of Job Providers :

- List Jobs: Providers can create and list job openings, including details like job title, job type,description, requirements, and salary.​

- Edit/Delete Jobs: Providers have the ability to edit or delete the job listings they have created.​

- View Applicants: Providers can view the list of applicants who have applied for their job openings.​

- View Resumes: Providers can access and view the resumes of applicants who have applied for their jobs.​

- Accept/Reject Applications: Providers can accept or reject the applications received for their job openings.​

- Edit Profile: Job seekers have the option to edit their profiles.

## Key Features of Job Seekers :​

- View Jobs: Job seekers can browse and view all the job listings available in the application, regardless of the provider.​

- Apply to Jobs: Job seekers can apply for the desired job openings after reading all the information regarding jobs.​

- View own Applications: Job seekers can view all the jobs in which they have applied.​

- Edit Profile: Job seekers have the option to edit their profiles.​

- Email Notifications: When providers accept or reject an application, an email notification is sent to the respective applicant.

## Folder Structure :

    .
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── public
    │   └── favicon.ico
    ├── README.md
    ├── src
    │   ├── App.css
    │   ├── App.tsx
    │   ├── assets
    │   │   ├── logo.png
    │   │   ├── no-data.jpg
    │   │   ├── preview.png
    │   │   └── signup.png
    │   ├── components
    │   │   ├── AllJobs
    │   │   │   └── AllJobsComponent.tsx
    │   │   ├── Applicants
    │   │   │   └── ApplicantsComponent.tsx
    │   │   ├── Applications
    │   │   │   └── ApplicationsComponent.tsx
    │   │   ├── Card
    │   │   │   ├── ApplicantCard
    │   │   │   │   ├── ApplicantCard.module.css
    │   │   │   │   └── ApplicantCard.tsx
    │   │   │   ├── JobCard
    │   │   │   │   ├── JobCard.module.css
    │   │   │   │   └── JobCard.tsx
    │   │   │   └── RoleSelecation
    │   │   │       ├── CardComponent.module.css
    │   │   │       └── CardComponent.tsx
    │   │   ├── EditProfile
    │   │   │   └── EditProfileComponent.tsx
    │   │   ├── Filter
    │   │   │   ├── Filter.module.css
    │   │   │   └── Filter.tsx
    │   │   ├── Forms
    │   │   │   ├── AddJob
    │   │   │   │   ├── AddJobComponent.module.css
    │   │   │   │   └── AddJobComponent.tsx
    │   │   │   ├── CompleteProfile
    │   │   │   │   ├── CompleteProfile.module.css
    │   │   │   │   └── CompletePropfile.tsx
    │   │   │   ├── formvalidation.ts
    │   │   │   ├── InputField
    │   │   │   │   ├── InputField.module.css
    │   │   │   │   └── InputField.tsx
    │   │   │   ├── Login
    │   │   │   │   └── LoginForm.tsx
    │   │   │   └── Signup
    │   │   │       ├── SignupForm.tsx
    │   │   │       └── Signup.module.css
    │   │   ├── JobDescription
    │   │   │   ├── JobDescription.module.css
    │   │   │   └── JobDescription.tsx
    │   │   ├── Loader
    │   │   │   ├── Loader.module.css
    │   │   │   └── Loader.tsx
    │   │   └── Navbar
    │   │       ├── Navbar.module.css
    │   │       └── Navbar.tsx
    │   ├── Firebase
    │   │   ├── firebase.ts
    │   │   ├── job.services.ts
    │   │   └── user.services.ts
    │   ├── Layouts
    │   │   ├── Container
    │   │   │   ├── ContainerLayout.module.css
    │   │   │   └── ContainerLayout.tsx
    │   │   ├── Form
    │   │   │   ├── FormLayout.module.css
    │   │   │   └── FormLayout.tsx
    │   │   └── Navigation
    │   │       ├── AppBarComponent.tsx
    │   │       ├── DrawerComponent.tsx
    │   │       ├── Navigation.module.css
    │   │       ├── Navigation.tsx
    │   │       └── RenderComponent.tsx
    │   ├── main.tsx
    │   ├── Pages
    │   │   ├── AddJob
    │   │   │   └── AddJob.tsx
    │   │   ├── AllJobs
    │   │   │   └── AllJobs.tsx
    │   │   ├── Applicants
    │   │   │   ├── Applicants.module.css
    │   │   │   └── Applicants.tsx
    │   │   ├── Applications
    │   │   │   └── Applications.tsx
    │   │   ├── CompleteProfile
    │   │   │   └── Profile.tsx
    │   │   ├── Editprofile
    │   │   │   ├── EditProfile.module.css
    │   │   │   └── EditProfile.tsx
    │   │   ├── ErrorPage
    │   │   │   ├── ErrorPage.module.css
    │   │   │   └── ErrorPage.tsx
    │   │   ├── Login
    │   │   │   └── Login.tsx
    │   │   ├── Signup
    │   │   │   └── Signup.tsx
    │   │   └── WelcomePage
    │   │       ├── WelcomePage.module.css
    │   │       └── WelcomePage.tsx
    │   ├── Routes
    │   │   ├── AllRoutes.tsx
    │   │   ├── AuthenticatedRoutes.tsx
    │   │   ├── ProviderRoutes.tsx
    │   │   ├── SeekerRoutes.tsx
    │   │   └── UnAuthenticatedRoutes.tsx
    │   ├── store
    │   │   ├── ActionCreators
    │   │   │   └── actionCreator.ts
    │   │   ├── authSlice.ts
    │   │   ├── index.ts
    │   │   ├── jobSlice.ts
    │   │   ├── loadingSlice.ts
    │   │   └── userSlice.ts
    │   ├── Types
    │   │   ├── props.ts
    │   │   └── types.ts
    │   ├── utils
    │   │   ├── functions
    │   │   │   ├── firebaseUtility.ts
    │   │   │   ├── profilePreview.ts
    │   │   │   └── ResumeHandler.ts
    │   │   └── Toaster.ts
    │   └── vite-env.d.ts
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
