┌────────────┐
│  Developer │
└─────┬──────┘
      │  Git Push
      ▼
┌────────────┐
│   GitHub   │
│ Repository │
└─────┬──────┘
      │ Webhook Trigger
      ▼
┌──────────────────────────────┐
│        Jenkins CI Server     │
│                              │
│  ┌────────────────────────┐ │
│  │ Checkout Source Code   │ │
│  └────────────────────────┘ │
│              │               │
│  ┌────────────────────────┐ │
│  │ npm install            │ │
│  └────────────────────────┘ │
│              │               │
│  ┌────────────────────────┐ │
│  │ SonarQube Analysis     │ │
│  └──────────┬─────────────┘ │
│             │               │
│             ▼               │
│     ┌──────────────────┐   │
│     │  SonarQube Server │   │
│     │  (Quality Gate)   │   │
│     └──────────────────┘   │
│             │               │
│   Quality Gate PASS?        │
│        │ YES                │
│        ▼                    │
│  ┌────────────────────────┐ │
│  │ Build Docker Image     │ │
│  └────────────────────────┘ │
│              │               │
│  ┌────────────────────────┐ │
│  │ Email Notification     │ │
│  │ (Success / Failure)   │ │


This is the "Pipeline as Code" approach. If the Definition is set to Pipeline script from SCM, you tell Jenkins:

Where the code is: You provide the Git URL.
and the our credential also where we state in the jenkins global cred

parametrized the env var like my email and the sonaqube key
