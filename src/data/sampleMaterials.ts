export interface TrainingMaterial {
  id: string;
  title: string;
  source: string;
  outline: OutlineItem[];
  content: string;
}

export interface OutlineItem {
  id: string;
  title: string;
  level: number;
  concepts: string[];
}

export const sampleMaterials: TrainingMaterial[] = [
  {
    id: 'material-1',
    title: 'Software Architecture Fundamentals',
    source: 'Company Training Deck 2023',
    outline: [
      {
        id: 'o1-1',
        title: 'Introduction to Software Architecture',
        level: 1,
        concepts: ['Definition', 'Importance', 'Role of Architect']
      },
      {
        id: 'o1-2',
        title: 'Design Patterns',
        level: 1,
        concepts: ['Creational Patterns', 'Structural Patterns', 'Behavioral Patterns']
      },
      {
        id: 'o1-3',
        title: 'Scalability Principles',
        level: 1,
        concepts: ['Horizontal Scaling', 'Vertical Scaling', 'Load Balancing']
      },
      {
        id: 'o1-4',
        title: 'Best Practices',
        level: 1,
        concepts: ['Code Quality', 'Documentation', 'Testing']
      }
    ],
    content: `# Software Architecture Fundamentals

## Introduction to Software Architecture

### Definition
Software architecture represents the high-level structure of a software system, defining its components and their relationships.

### Importance
- Provides a blueprint for system development
- Facilitates communication among stakeholders
- Enables early design decisions

### Role of Architect
The software architect is responsible for making key technical decisions and establishing coding standards.

## Design Patterns

### Creational Patterns
- **Singleton**: Ensures a class has only one instance
- **Factory**: Creates objects without specifying exact classes
- **Builder**: Constructs complex objects step by step

### Structural Patterns
- **Adapter**: Makes incompatible interfaces work together
- **Decorator**: Adds new functionality to objects dynamically
- **Facade**: Provides simplified interface to complex subsystem

### Behavioral Patterns
- **Observer**: Defines one-to-many dependency between objects
- **Strategy**: Encapsulates algorithms and makes them interchangeable
- **Command**: Encapsulates requests as objects

## Scalability Principles

### Horizontal Scaling
Adding more machines to distribute the load across multiple servers.

### Vertical Scaling
Increasing the capacity of existing machines with more powerful hardware.

### Load Balancing
Distributing incoming traffic across multiple servers to optimize resource use.

## Best Practices

### Code Quality
- Write clean, maintainable code
- Follow SOLID principles
- Use meaningful naming conventions

### Documentation
- Document API endpoints
- Maintain architecture decision records
- Keep README files up to date

### Testing
- Unit tests for individual components
- Integration tests for component interactions
- End-to-end tests for complete workflows`
  },
  {
    id: 'material-2',
    title: 'Modern Architecture Patterns',
    source: 'External Conference Workshop 2024',
    outline: [
      {
        id: 'o2-1',
        title: 'Microservices Architecture',
        level: 1,
        concepts: ['Service Independence', 'API Gateway', 'Service Discovery']
      },
      {
        id: 'o2-2',
        title: 'Design Patterns in Practice',
        level: 1,
        concepts: ['Singleton Pattern', 'Factory Pattern', 'Repository Pattern']
      },
      {
        id: 'o2-3',
        title: 'Cloud Native Design',
        level: 1,
        concepts: ['Containerization', 'Orchestration', 'Auto-scaling']
      },
      {
        id: 'o2-4',
        title: 'Security Considerations',
        level: 1,
        concepts: ['Authentication', 'Authorization', 'Data Encryption']
      }
    ],
    content: `# Modern Architecture Patterns

## Microservices Architecture

### Service Independence
Each microservice can be developed, deployed, and scaled independently.

**Benefits:**
- Faster deployment cycles
- Technology flexibility
- Fault isolation

### API Gateway
A single entry point that routes requests to appropriate microservices.

### Service Discovery
Mechanism for services to find and communicate with each other dynamically.

## Design Patterns in Practice

### Singleton Pattern
Useful for managing shared resources like database connections or configuration managers.

**Implementation considerations:**
- Thread safety in multi-threaded environments
- Lazy vs eager initialization
- Testing challenges with global state

### Factory Pattern
Simplifies object creation and promotes loose coupling.

### Repository Pattern
Abstracts data access logic and provides a collection-like interface for accessing domain objects.

## Cloud Native Design

### Containerization
Packaging applications with their dependencies for consistent deployment across environments.

**Popular tools:**
- Docker for containerization
- Podman as Docker alternative

### Orchestration
Managing container lifecycle, scaling, and networking.

**Key platform:**
- Kubernetes as industry standard
- Docker Swarm for simpler deployments

### Auto-scaling
Automatically adjusting resources based on demand.

## Security Considerations

### Authentication
Verifying the identity of users and services.

- OAuth 2.0 for authorization
- JWT tokens for stateless authentication
- Multi-factor authentication for enhanced security

### Authorization
Controlling access to resources based on user permissions.

### Data Encryption
Protecting data at rest and in transit using industry-standard encryption.`
  },
  {
    id: 'material-3',
    title: 'Enterprise Architecture Guide',
    source: 'Internal Team Documentation 2024',
    outline: [
      {
        id: 'o3-1',
        title: 'Architecture Overview',
        level: 1,
        concepts: ['System Components', 'Integration Points', 'Data Flow']
      },
      {
        id: 'o3-2',
        title: 'Scalability and Performance',
        level: 1,
        concepts: ['Caching Strategies', 'Database Optimization', 'Horizontal Scaling']
      },
      {
        id: 'o3-3',
        title: 'Common Design Patterns',
        level: 1,
        concepts: ['MVC Pattern', 'Observer Pattern', 'Factory Pattern']
      },
      {
        id: 'o3-4',
        title: 'Deployment Strategies',
        level: 1,
        concepts: ['Blue-Green Deployment', 'Canary Releases', 'Rolling Updates']
      }
    ],
    content: `# Enterprise Architecture Guide

## Architecture Overview

### System Components
Understanding the building blocks of enterprise systems.

**Core components:**
- Frontend applications
- Backend services
- Data storage layers
- Message queues
- Caching layers

### Integration Points
How different systems communicate and share data.

### Data Flow
Tracking how information moves through the system from input to output.

## Scalability and Performance

### Caching Strategies
Implementing caching at multiple levels to improve performance.

**Caching layers:**
- Browser caching for static assets
- CDN for global content delivery
- Application-level caching with Redis or Memcached
- Database query caching

### Database Optimization
- Proper indexing strategies
- Query optimization
- Connection pooling
- Read replicas for scaling reads

### Horizontal Scaling
Distributing load across multiple server instances.

**Considerations:**
- Stateless application design
- Session management in distributed systems
- Database sharding for data distribution

## Common Design Patterns

### MVC Pattern
Separating application logic into Model, View, and Controller.

### Observer Pattern
Establishing one-to-many relationships where observers are notified of state changes.

### Factory Pattern
Centralizing object creation logic to improve maintainability.

## Deployment Strategies

### Blue-Green Deployment
Running two identical production environments, switching traffic between them.

**Advantages:**
- Zero-downtime deployments
- Easy rollback capability
- Testing in production-like environment

### Canary Releases
Gradually rolling out changes to a small subset of users before full deployment.

### Rolling Updates
Incrementally updating instances without taking the entire system offline.`
  }
];
