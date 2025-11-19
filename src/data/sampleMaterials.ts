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

Software architecture represents the high-level structure of a software system, defining its components, their relationships, and the principles governing their design and evolution. It serves as the blueprint for both the system and the project developing it, defining the work assignments that must be carried out by design and implementation teams.

**Key Aspects:**
- **Structure**: The organization of system components and their relationships
- **Behavior**: How components interact to fulfill system requirements
- **Non-functional Requirements**: Performance, security, scalability, maintainability
- **Technology Choices**: Programming languages, frameworks, databases, and infrastructure

A well-designed architecture provides a technical foundation that supports business objectives while remaining flexible enough to accommodate future changes. It addresses both immediate functional requirements and long-term strategic goals.

**Example Architecture Layers:**
\`\`\`
Presentation Layer (UI/API)
    ↓
Business Logic Layer (Services)
    ↓
Data Access Layer (Repositories)
    ↓
Data Storage Layer (Databases)
\`\`\`

### Importance

Understanding and implementing proper software architecture is critical for project success. Poor architectural decisions made early in a project can lead to technical debt that becomes increasingly expensive to address over time.

**Benefits of Good Architecture:**

1. **Reduced Development Costs**: Clear structure enables parallel development and reduces integration issues
2. **Improved Maintainability**: Well-defined boundaries make it easier to locate and fix bugs
3. **Enhanced Scalability**: Proper architecture supports growth without major refactoring
4. **Better Team Collaboration**: Shared understanding of system structure improves communication
5. **Risk Mitigation**: Early identification of technical challenges and constraints
6. **Quality Attributes**: Ensures system meets performance, security, and reliability requirements

**Real-World Impact:**
Companies like Netflix, Amazon, and Uber have attributed their ability to scale rapidly to strong architectural foundations. Netflix's move to microservices architecture enabled them to handle over 200 million subscribers globally while maintaining 99.99% uptime.

**Common Pitfalls of Poor Architecture:**
- Monolithic systems that become impossible to modify
- Performance bottlenecks discovered too late
- Security vulnerabilities baked into the design
- Inability to adopt new technologies
- High cost of adding new features

### Role of Architect

The software architect bridges the gap between business requirements and technical implementation. They are responsible for making critical decisions that shape the system's structure and guide the development team.

**Core Responsibilities:**

1. **Technical Vision and Strategy**
   - Define overall system architecture and design principles
   - Select appropriate technologies, frameworks, and tools
   - Create architectural roadmap aligned with business goals
   - Evaluate and introduce new technologies

2. **Design and Documentation**
   - Create architectural diagrams and documentation
   - Define component interfaces and interactions
   - Establish data models and schemas
   - Document architectural decisions and rationale

3. **Quality Assurance**
   - Establish coding standards and best practices
   - Define testing strategies (unit, integration, e2e)
   - Review code for architectural compliance
   - Ensure security and performance requirements are met

4. **Team Leadership**
   - Mentor developers on architectural principles
   - Conduct design reviews and technical discussions
   - Resolve technical disputes and blockers
   - Foster culture of technical excellence

5. **Stakeholder Communication**
   - Translate business requirements into technical solutions
   - Present technical concepts to non-technical stakeholders
   - Balance technical ideals with business constraints
   - Manage technical risks and trade-offs

**Key Skills:**
- Deep technical expertise across multiple domains
- Strong communication and presentation abilities
- Business acumen and strategic thinking
- Problem-solving and analytical skills
- Leadership and mentoring capabilities

**Architect vs. Developer:**
While developers focus on implementing features, architects focus on the overall system design. However, the best architects remain hands-on with code to maintain credibility and stay current with technology trends.

## Design Patterns

Design patterns are proven solutions to common software design problems. They represent best practices evolved over time and provide a shared vocabulary for developers to communicate design concepts.

### Creational Patterns

Creational patterns deal with object creation mechanisms, trying to create objects in a manner suitable to the situation.

**Singleton Pattern**

Ensures a class has only one instance throughout the application lifetime and provides a global access point to it.

**Use Cases:**
- Configuration managers
- Database connection pools
- Logging services
- Cache managers

**Implementation Example:**
\`\`\`typescript
class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connection: any;

  private constructor() {
    this.connection = this.createConnection();
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  private createConnection() {
    // Connection logic
    return { connected: true };
  }

  public query(sql: string) {
    return this.connection.execute(sql);
  }
}

// Usage
const db = DatabaseConnection.getInstance();
\`\`\`

**Pros:**
- Controlled access to sole instance
- Reduced memory footprint
- Lazy initialization possible

**Cons:**
- Difficult to unit test (global state)
- Can hide dependencies
- Thread safety concerns in multi-threaded environments

**Factory Pattern**

Creates objects without specifying the exact class of object that will be created. Provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created.

**Use Cases:**
- Creating UI components based on user preferences
- Generating different types of reports
- Database driver selection
- Payment gateway integration

**Implementation Example:**
\`\`\`typescript
interface PaymentProcessor {
  processPayment(amount: number): boolean;
}

class CreditCardProcessor implements PaymentProcessor {
  processPayment(amount: number): boolean {
    console.log(\`Processing $\${amount} via Credit Card\`);
    return true;
  }
}

class PayPalProcessor implements PaymentProcessor {
  processPayment(amount: number): boolean {
    console.log(\`Processing $\${amount} via PayPal\`);
    return true;
  }
}

class PaymentFactory {
  static createProcessor(type: string): PaymentProcessor {
    switch(type) {
      case 'credit':
        return new CreditCardProcessor();
      case 'paypal':
        return new PayPalProcessor();
      default:
        throw new Error('Invalid payment type');
    }
  }
}

// Usage
const processor = PaymentFactory.createProcessor('paypal');
processor.processPayment(100);
\`\`\`

**Builder Pattern**

Constructs complex objects step by step. Allows you to produce different types and representations of an object using the same construction code.

**Use Cases:**
- Building complex configuration objects
- Creating immutable objects with many optional parameters
- Constructing SQL queries
- Generating complex documents or reports

**Implementation Example:**
\`\`\`typescript
class HttpRequest {
  private url?: string;
  private method?: string;
  private headers?: Map<string, string>;
  private body?: any;

  setUrl(url: string) {
    this.url = url;
    return this;
  }

  setMethod(method: string) {
    this.method = method;
    return this;
  }

  addHeader(key: string, value: string) {
    if (!this.headers) this.headers = new Map();
    this.headers.set(key, value);
    return this;
  }

  setBody(body: any) {
    this.body = body;
    return this;
  }

  build() {
    return {
      url: this.url,
      method: this.method,
      headers: this.headers,
      body: this.body
    };
  }
}

// Usage
const request = new HttpRequest()
  .setUrl('https://api.example.com/users')
  .setMethod('POST')
  .addHeader('Content-Type', 'application/json')
  .addHeader('Authorization', 'Bearer token123')
  .setBody({ name: 'John Doe' })
  .build();
\`\`\`

### Structural Patterns

Structural patterns explain how to assemble objects and classes into larger structures while keeping them flexible and efficient.

**Adapter Pattern**

Allows objects with incompatible interfaces to work together. Acts as a wrapper between two objects, catching calls for one object and transforming them to format and interface recognizable by the second object.

**Use Cases:**
- Integrating third-party libraries
- Legacy system integration
- API version compatibility
- Data format conversion

**Decorator Pattern**

Attaches additional responsibilities to an object dynamically. Provides a flexible alternative to subclassing for extending functionality.

**Use Cases:**
- Adding middleware to request handlers
- Enhancing UI components
- Adding caching to data access
- Logging and monitoring wrappers

**Facade Pattern**

Provides a simplified interface to a complex subsystem. Makes a library easier to use, understand, and test by hiding complexity behind a simple interface.

**Use Cases:**
- Simplifying complex APIs
- Database access layers
- Third-party service integration
- Framework wrappers

### Behavioral Patterns

Behavioral patterns are concerned with algorithms and the assignment of responsibilities between objects.

**Observer Pattern**

Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified automatically.

**Use Cases:**
- Event handling systems
- Model-View updates (MVC)
- Reactive programming
- Real-time notifications

**Implementation Example:**
\`\`\`typescript
interface Observer {
  update(data: any): void;
}

class Subject {
  private observers: Observer[] = [];

  attach(observer: Observer) {
    this.observers.push(observer);
  }

  detach(observer: Observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(data: any) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class UserActivityLogger implements Observer {
  update(data: any) {
    console.log('Logging user activity:', data);
  }
}

class EmailNotifier implements Observer {
  update(data: any) {
    console.log('Sending email notification:', data);
  }
}
\`\`\`

**Strategy Pattern**

Defines a family of algorithms, encapsulates each one, and makes them interchangeable. Lets the algorithm vary independently from clients that use it.

**Use Cases:**
- Sorting algorithms
- Compression strategies
- Validation rules
- Payment processing methods

**Command Pattern**

Encapsulates a request as an object, thereby allowing you to parameterize clients with queues, requests, and operations.

**Use Cases:**
- Undo/Redo functionality
- Transaction management
- Job queues
- Macro recording

## Scalability Principles

Scalability is the capability of a system to handle a growing amount of work by adding resources. Understanding scalability principles is essential for building systems that can grow with your business.

### Horizontal Scaling

Horizontal scaling (scale-out) involves adding more machines to your resource pool to distribute load across multiple servers. This is the preferred approach for modern cloud-native applications.

**How It Works:**
Instead of upgrading a single server, you add more servers to share the workload. Each server handles a portion of the total traffic, and a load balancer distributes requests across all servers.

**Benefits:**
- **Cost-effective**: Use commodity hardware instead of expensive high-end servers
- **High availability**: No single point of failure; system continues if one server fails
- **Elastic scaling**: Add or remove servers based on demand
- **Geographic distribution**: Place servers closer to users globally
- **Unlimited growth potential**: Can theoretically scale infinitely

**Implementation Strategies:**

1. **Stateless Application Design**
   - Store session data in distributed cache (Redis, Memcached)
   - Use JWT tokens for authentication
   - Avoid server-side session storage

2. **Database Sharding**
   - Partition data across multiple database instances
   - Use consistent hashing for distribution
   - Example: User data sharded by user_id ranges

3. **Microservices Architecture**
   - Split application into independent services
   - Scale each service independently based on demand
   - Use container orchestration (Kubernetes)

**Real-World Example:**
Amazon's shopping cart service can scale to handle millions of concurrent users during Black Friday by adding thousands of server instances automatically.

**Challenges:**
- Complexity in managing distributed systems
- Data consistency across nodes
- Network latency between services
- Deployment and configuration management

### Vertical Scaling

Vertical scaling (scale-up) involves increasing the capacity of existing machines by adding more powerful hardware resources like CPU, RAM, or storage.

**How It Works:**
Upgrade a single server with more powerful components. For example, increasing RAM from 16GB to 128GB or upgrading from 4 cores to 32 cores.

**Benefits:**
- **Simplicity**: No architectural changes required
- **Lower complexity**: Easier to manage single server
- **No data consistency issues**: Single source of truth
- **Better for legacy applications**: Doesn't require code changes

**Use Cases:**
- Database servers requiring high-performance storage
- Applications with tightly coupled components
- Quick fixes for performance issues
- Workloads requiring low latency

**Limitations:**
- **Hardware limits**: Eventually hit physical constraints
- **Cost**: High-end hardware becomes exponentially expensive
- **Single point of failure**: System down if server fails
- **Downtime**: Often requires shutdown for upgrades
- **Limited growth**: Cannot scale beyond single machine capacity

**Example Scenario:**
A PostgreSQL database experiencing slow queries might benefit from upgrading from 32GB to 256GB RAM to cache more data in memory.

**Best Practices:**
- Monitor resource utilization (CPU, memory, disk I/O)
- Identify bottlenecks before scaling
- Consider vertical scaling for databases and caches
- Use as short-term solution while planning horizontal scaling

### Load Balancing

Load balancing distributes incoming network traffic across multiple servers to ensure no single server bears too much demand. It improves responsiveness and increases availability of applications.

**Load Balancing Algorithms:**

1. **Round Robin**: Distributes requests sequentially across servers
2. **Least Connections**: Sends requests to server with fewest active connections
3. **IP Hash**: Routes client to same server based on IP address
4. **Weighted Round Robin**: Assigns more requests to more powerful servers
5. **Least Response Time**: Routes to server with lowest response time

**Types of Load Balancers:**

**Layer 4 (Transport Layer)**
- Routes based on IP and TCP/UDP port
- Fast and efficient
- Cannot inspect application data
- Example: AWS Network Load Balancer

**Layer 7 (Application Layer)**
- Routes based on HTTP headers, cookies, URL paths
- Can perform SSL termination
- Enables content-based routing
- Example: AWS Application Load Balancer, NGINX

**Implementation Example:**
\`\`\`nginx
upstream backend {
    least_conn;
    server backend1.example.com:8080 weight=3;
    server backend2.example.com:8080 weight=2;
    server backend3.example.com:8080 weight=1;
}

server {
    listen 80;
    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
\`\`\`

**Health Checks:**
Load balancers continuously monitor server health:
- Ping checks for basic connectivity
- TCP connection attempts
- HTTP endpoint checks
- Custom application-level health checks

**Session Persistence (Sticky Sessions):**
Ensures user requests route to same server:
- Cookie-based persistence
- IP address-based persistence
- Useful for stateful applications
- Can impact load distribution

**Benefits:**
- Increased reliability and fault tolerance
- Optimized resource utilization
- Improved user experience
- Zero-downtime deployments (rolling updates)
- SSL termination at load balancer

## Best Practices

### Code Quality

Writing high-quality code is fundamental to building maintainable and scalable software systems. Code quality directly impacts development velocity, bug rates, and system reliability.

**SOLID Principles:**

1. **Single Responsibility Principle (SRP)**
   - Each class should have one reason to change
   - Improves maintainability and testability
   - Example: Separate UserAuthentication from UserProfile management

2. **Open/Closed Principle (OCP)**
   - Open for extension, closed for modification
   - Use interfaces and inheritance
   - Add new features without changing existing code

3. **Liskov Substitution Principle (LSP)**
   - Subtypes must be substitutable for base types
   - Ensures inheritance hierarchies are logically correct

4. **Interface Segregation Principle (ISP)**
   - Clients shouldn't depend on interfaces they don't use
   - Create specific interfaces rather than general-purpose ones

5. **Dependency Inversion Principle (DIP)**
   - Depend on abstractions, not concrete implementations
   - Enables loose coupling and easier testing

**Clean Code Practices:**

**Meaningful Naming:**
\`\`\`typescript
// Bad
const d = new Date();
function calc(x, y) { return x * y * 0.2; }

// Good
const orderDate = new Date();
function calculateOrderTax(subtotal, taxRate) {
  return subtotal * taxRate;
}
\`\`\`

**Small Functions:**
- Functions should do one thing well
- Ideal length: 5-15 lines
- Maximum: 20-30 lines

**Avoid Code Duplication (DRY):**
- Extract repeated code into functions
- Use composition and inheritance
- Create utility libraries for common operations

**Error Handling:**
\`\`\`typescript
// Use custom error types
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Handle errors appropriately
try {
  validateUserInput(data);
} catch (error) {
  if (error instanceof ValidationError) {
    return res.status(400).json({ error: error.message });
  }
  throw error; // Re-throw unexpected errors
}
\`\`\`

**Code Review Benefits:**
- Knowledge sharing across team
- Catch bugs before production
- Ensure consistency with standards
- Mentor junior developers
- Improve overall code quality

### Documentation

Good documentation is essential for maintaining software systems and enabling team collaboration.

**Code Comments:**
- Explain WHY, not WHAT
- Document complex algorithms
- Add TODO/FIXME for technical debt
- Avoid obvious comments

**API Documentation:**
\`\`\`typescript
/**
 * Creates a new user account
 * 
 * @param userData - User registration information
 * @param userData.email - User's email address (must be unique)
 * @param userData.password - Password (min 8 characters)
 * @returns Created user object with generated ID
 * @throws ValidationError if email already exists
 * 
 * @example
 * const user = await createUser({
 *   email: 'john@example.com',
 *   password: 'SecurePass123'
 * });
 */
async function createUser(userData: UserInput): Promise<User> {
  // Implementation
}
\`\`\`

**Architecture Decision Records (ADRs):**
Document important architectural decisions:
- Context: What situation led to this decision
- Decision: What was decided
- Consequences: Trade-offs and implications
- Status: Proposed, Accepted, Deprecated

**README Files:**
- Project overview and purpose
- Setup and installation instructions
- Development workflow
- Deployment procedures
- Troubleshooting guide

**Keep Documentation Updated:**
- Review docs during code reviews
- Update when making changes
- Use automation where possible
- Remove outdated documentation

### Testing

Comprehensive testing ensures code quality and prevents regressions.

**Testing Pyramid:**
\`\`\`
        /\\
       /e2e\\       Few, slow, expensive
      /------\\
     /  inte  \\    Moderate number
    /  gration \\
   /------------\\
  /   unit tests \\ Many, fast, cheap
 /________________\\
\`\`\`

**Unit Tests:**
- Test individual functions/methods in isolation
- Fast execution (milliseconds)
- Should cover 70-80% of codebase
- Use mocking for dependencies

\`\`\`typescript
describe('calculateDiscount', () => {
  it('should apply 10% discount for premium users', () => {
    const result = calculateDiscount(100, 'premium');
    expect(result).toBe(90);
  });

  it('should return original price for regular users', () => {
    const result = calculateDiscount(100, 'regular');
    expect(result).toBe(100);
  });
});
\`\`\`

**Integration Tests:**
- Test interaction between components
- Verify database queries and API calls
- Test with real dependencies when possible
- Should cover critical workflows

**End-to-End Tests:**
- Test complete user journeys
- Use tools like Cypress, Playwright, Selenium
- Simulate real user behavior
- Maintain small number of critical paths

**Test-Driven Development (TDD):**
1. Write failing test
2. Write minimal code to pass
3. Refactor while keeping tests green

**Benefits:**
- Better code design
- Living documentation
- Faster debugging
- Confidence in refactoring

**Continuous Integration:**
- Run tests on every commit
- Block merges if tests fail
- Generate coverage reports
- Automate deployment for passing builds`
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

Microservices architecture is an approach to building applications as a collection of small, autonomous services modeled around a business domain. Each service is independently deployable and scalable, running in its own process and communicating with lightweight mechanisms.

### Service Independence

Each microservice can be developed, deployed, and scaled independently without affecting other services in the system. This independence is the cornerstone of microservices architecture.

**Key Characteristics:**

1. **Autonomous Development**
   - Teams can work on different services simultaneously
   - No need to coordinate releases across entire system
   - Choose technology stack best suited for each service
   - Independent versioning and lifecycle management

2. **Isolated Data Management**
   - Each service owns its database
   - No shared database across services
   - Encapsulated data model
   - Polyglot persistence (different databases for different needs)

**Benefits:**

- **Faster Deployment Cycles**: Deploy new features without touching entire application
- **Technology Flexibility**: Use different programming languages and frameworks per service
- **Fault Isolation**: One service failure doesn't bring down entire system
- **Team Autonomy**: Small teams can own entire service lifecycle
- **Scalability**: Scale only the services that need it

**Example Service Breakdown:**

\`\`\`
E-commerce Application:
├── User Service (Node.js + MongoDB)
├── Product Catalog (Python + PostgreSQL)
├── Shopping Cart (Go + Redis)
├── Order Processing (Java + MySQL)
├── Payment Service (Node.js + Stripe API)
├── Notification Service (Python + RabbitMQ)
└── Recommendation Engine (Python + TensorFlow)
\`\`\`

**Communication Patterns:**

1. **Synchronous (HTTP/REST, gRPC)**
   - Direct request-response
   - Good for read operations
   - Potential for cascading failures

2. **Asynchronous (Message Queue)**
   - Event-driven architecture
   - Better for write operations
   - Improved resiliency

**Challenges:**

- **Distributed System Complexity**: Network latency, partial failures
- **Data Consistency**: Eventual consistency vs. strong consistency
- **Testing**: More complex integration testing
- **Monitoring**: Need distributed tracing and centralized logging
- **Operational Overhead**: More services to deploy and maintain

### API Gateway

An API Gateway acts as a single entry point for all client requests, routing them to appropriate microservices. It handles cross-cutting concerns and provides a unified interface to clients.

**Core Responsibilities:**

1. **Request Routing**
   - Route requests to appropriate microservice
   - Path-based routing (/api/users → User Service)
   - Header-based routing (API versioning)
   - Load balancing across service instances

2. **Authentication & Authorization**
   - Centralized security enforcement
   - Token validation (JWT verification)
   - OAuth 2.0 integration
   - API key management

3. **Rate Limiting & Throttling**
   - Prevent API abuse
   - Per-client rate limits
   - Protect backend services from overload

4. **Request/Response Transformation**
   - Aggregate multiple service calls
   - Transform legacy API formats
   - Response caching
   - Compression and optimization

**Implementation Example:**

\`\`\`javascript
// Kong API Gateway Configuration
{
  "name": "user-service",
  "url": "http://user-service:8080",
  "routes": [{
    "paths": ["/api/users"],
    "methods": ["GET", "POST", "PUT", "DELETE"]
  }],
  "plugins": [
    {
      "name": "jwt",
      "config": {
        "claims_to_verify": ["exp"]
      }
    },
    {
      "name": "rate-limiting",
      "config": {
        "minute": 100,
        "policy": "local"
      }
    }
  ]
}
\`\`\`

**Benefits:**
- Simplified client interface
- Reduced round trips (aggregation)
- Centralized security policies
- Analytics and monitoring
- Protocol translation (WebSocket, gRPC to REST)

**Popular API Gateways:**
- Kong
- AWS API Gateway
- Azure API Management
- NGINX
- Traefik

### Service Discovery

Service discovery is a mechanism that allows services to find and communicate with each other dynamically without hard-coding hostname and port information.

**Why Service Discovery?**

In microservices, service instances have dynamically assigned network locations. Instances are added/removed based on auto-scaling, failures, and upgrades. Hard-coded addresses don't work in this dynamic environment.

**Discovery Patterns:**

1. **Client-Side Discovery**
   - Client queries service registry
   - Client selects available instance
   - Client makes direct request
   - Example: Netflix Eureka

2. **Server-Side Discovery**
   - Client makes request to load balancer
   - Load balancer queries service registry
   - Load balancer forwards request
   - Example: AWS ELB + Route 53

**Service Registry:**

Maintains a database of available service instances and their locations.

\`\`\`javascript
// Consul Service Registration
{
  "ID": "user-service-1",
  "Name": "user-service",
  "Address": "10.0.1.20",
  "Port": 8080,
  "Tags": ["v1", "production"],
  "Check": {
    "HTTP": "http://10.0.1.20:8080/health",
    "Interval": "10s",
    "Timeout": "1s"
  }
}
\`\`\`

**Health Checks:**
- Services register with heartbeat
- Registry removes unhealthy instances
- Automatic recovery when service returns

**Popular Tools:**
- Consul (HashiCorp)
- etcd (CoreOS)
- ZooKeeper (Apache)
- Eureka (Netflix OSS)
- Kubernetes Service Discovery (built-in)

## Design Patterns in Practice

### Singleton Pattern

The Singleton pattern ensures a class has only one instance throughout the application's lifetime and provides global access to it. Useful for managing shared resources.

**Real-World Use Cases:**

1. **Configuration Management**
\`\`\`typescript
class ConfigManager {
  private static instance: ConfigManager;
  private config: Map<string, any>;

  private constructor() {
    this.config = new Map();
    this.loadConfig();
  }

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  private loadConfig() {
    // Load from environment variables, files, etc.
    this.config.set('apiUrl', process.env.API_URL);
    this.config.set('timeout', parseInt(process.env.TIMEOUT || '3000'));
  }

  get(key: string): any {
    return this.config.get(key);
  }
}

// Usage across application
const config = ConfigManager.getInstance();
const apiUrl = config.get('apiUrl');
\`\`\`

2. **Database Connection Pool**
3. **Logger Instance**
4. **Cache Manager**

**Implementation Considerations:**

- **Thread Safety**: Use locks or atomic operations in multi-threaded environments
- **Lazy vs Eager Initialization**: Lazy creates instance on first use, Eager at startup
- **Testing Challenges**: Global state makes unit testing difficult; consider dependency injection

**Pros:**
- Controlled access to single instance
- Reduced memory footprint
- Can implement lazy initialization

**Cons:**
- Difficult to unit test (global state)
- Can hide dependencies
- Violates Single Responsibility Principle
- Thread safety concerns

### Factory Pattern

The Factory pattern provides an interface for creating objects without specifying their exact classes. It delegates instantiation logic to factory methods.

**Real-World Implementation:**

\`\`\`typescript
// Payment processing system
interface PaymentProcessor {
  processPayment(amount: number, currency: string): Promise<PaymentResult>;
  refund(transactionId: string): Promise<boolean>;
  getStatus(transactionId: string): Promise<PaymentStatus>;
}

class StripeProcessor implements PaymentProcessor {
  private stripe: Stripe;

  constructor(apiKey: string) {
    this.stripe = new Stripe(apiKey);
  }

  async processPayment(amount: number, currency: string): Promise<PaymentResult> {
    const charge = await this.stripe.charges.create({
      amount: amount * 100,
      currency: currency,
    });
    return {
      success: true,
      transactionId: charge.id,
      message: 'Payment processed via Stripe'
    };
  }

  async refund(transactionId: string): Promise<boolean> {
    await this.stripe.refunds.create({ charge: transactionId });
    return true;
  }

  async getStatus(transactionId: string): Promise<PaymentStatus> {
    const charge = await this.stripe.charges.retrieve(transactionId);
    return { status: charge.status, amount: charge.amount / 100 };
  }
}

class PayPalProcessor implements PaymentProcessor {
  async processPayment(amount: number, currency: string): Promise<PaymentResult> {
    // PayPal API integration
    return {
      success: true,
      transactionId: 'PP-' + Date.now(),
      message: 'Payment processed via PayPal'
    };
  }

  async refund(transactionId: string): Promise<boolean> {
    // PayPal refund logic
    return true;
  }

  async getStatus(transactionId: string): Promise<PaymentStatus> {
    // PayPal status check
    return { status: 'completed', amount: 100 };
  }
}

class PaymentProcessorFactory {
  static createProcessor(
    type: string,
    config: any
  ): PaymentProcessor {
    switch(type.toLowerCase()) {
      case 'stripe':
        return new StripeProcessor(config.apiKey);
      case 'paypal':
        return new PayPalProcessor();
      case 'square':
        return new SquareProcessor(config);
      default:
        throw new Error(\`Unsupported payment processor: \${type}\`);
    }
  }
}

// Usage
const processor = PaymentProcessorFactory.createProcessor('stripe', {
  apiKey: process.env.STRIPE_KEY
});
await processor.processPayment(99.99, 'USD');
\`\`\`

**Benefits:**
- Decouples client code from concrete implementations
- Easy to add new implementations
- Centralized creation logic
- Promotes loose coupling

### Repository Pattern

The Repository pattern abstracts data access logic, providing a collection-like interface for accessing domain objects. It mediates between the domain and data mapping layers.

**Architecture:**

\`\`\`
Controller → Service → Repository → Database
\`\`\`

**Implementation:**

\`\`\`typescript
// Domain Entity
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

// Repository Interface
interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(filters?: UserFilters): Promise<User[]>;
  create(user: Omit<User, 'id' | 'createdAt'>): Promise<User>;
  update(id: string, data: Partial<User>): Promise<User>;
  delete(id: string): Promise<boolean>;
}

// PostgreSQL Implementation
class PostgresUserRepository implements UserRepository {
  constructor(private db: Database) {}

  async findById(id: string): Promise<User | null> {
    const result = await this.db.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await this.db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  }

  async create(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const result = await this.db.query(
      'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING *',
      [userData.email, userData.name]
    );
    return result.rows[0];
  }

  // ... other methods
}

// MongoDB Implementation
class MongoUserRepository implements UserRepository {
  constructor(private collection: Collection) {}

  async findById(id: string): Promise<User | null> {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  // ... MongoDB-specific implementations
}

// Service Layer (database-agnostic)
class UserService {
  constructor(private userRepo: UserRepository) {}

  async registerUser(email: string, name: string): Promise<User> {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) {
      throw new Error('Email already registered');
    }
    return await this.userRepo.create({ email, name });
  }
}
\`\`\`

**Benefits:**
- Decouples business logic from data access
- Easy to switch database implementations
- Simplifies testing (mock repository)
- Centralized query logic
- Domain-driven design support

## Cloud Native Design

Cloud native design embraces practices that take full advantage of cloud computing models, enabling applications to be resilient, manageable, and observable.

### Containerization

Containerization packages an application and its dependencies into a single, lightweight, portable container that can run consistently across different environments.

**How Containers Work:**

Containers virtualize the operating system rather than hardware, sharing the host OS kernel while isolating processes, filesystems, and resources.

\`\`\`
Traditional VMs:        Containers:
┌────────────────┐     ┌────────────────┐
│  Application   │     │  Application   │
├────────────────┤     ├────────────────┤
│   Guest OS     │     │  Dependencies  │
├────────────────┤     ├────────────────┤
│   Hypervisor   │     │ Container Runtime
├────────────────┤     ├────────────────┤
│   Host OS      │     │   Host OS      │
└────────────────┘     └────────────────┘
\`\`\`

**Docker Example:**

\`\`\`dockerfile
# Dockerfile for Node.js application
FROM node:18-alpine

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD node healthcheck.js

# Start application
CMD ["node", "server.js"]
\`\`\`

**Building and Running:**
\`\`\`bash
# Build image
docker build -t myapp:1.0.0 .

# Run container
docker run -d \\
  --name myapp \\
  -p 3000:3000 \\
  -e NODE_ENV=production \\
  -e DATABASE_URL=postgres://... \\
  myapp:1.0.0
\`\`\`

**Benefits:**
- **Consistency**: Same environment from dev to production
- **Portability**: Run anywhere containers are supported
- **Isolation**: Process and dependency isolation
- **Efficiency**: Lightweight compared to VMs
- **Fast Startup**: Seconds vs minutes for VMs
- **Version Control**: Image versioning and rollback

**Container Registries:**
- Docker Hub
- AWS ECR (Elastic Container Registry)
- Google Container Registry
- Azure Container Registry
- Harbor (self-hosted)

### Orchestration

Container orchestration automates the deployment, scaling, networking, and management of containerized applications.

**Kubernetes Architecture:**

\`\`\`
┌─────────────────────────────────────┐
│          Control Plane              │
│  ┌──────────┬──────────┬─────────┐ │
│  │ API      │Scheduler │ Controller│ │
│  │ Server   │          │ Manager   │ │
│  └──────────┴──────────┴─────────┘ │
└─────────────────────────────────────┘
           │
    ┌──────┴──────┐
    ▼             ▼
┌────────┐    ┌────────┐
│ Node 1 │    │ Node 2 │
│ ┌────┐ │    │ ┌────┐ │
│ │Pod │ │    │ │Pod │ │
│ └────┘ │    │ └────┘ │
└────────┘    └────────┘
\`\`\`

**Kubernetes Deployment:**

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:1.0.0
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
\`\`\`

**Key Features:**
- **Self-healing**: Automatically restarts failed containers
- **Auto-scaling**: Scale based on CPU, memory, or custom metrics
- **Load balancing**: Distributes traffic across pod replicas
- **Rolling updates**: Zero-downtime deployments
- **Service discovery**: Automatic DNS for services
- **Secret management**: Secure handling of sensitive data

### Auto-scaling

Auto-scaling automatically adjusts computing resources based on actual demand, optimizing cost and performance.

**Types of Auto-scaling:**

1. **Horizontal Pod Autoscaler (HPA)** - Scales number of pods
2. **Vertical Pod Autoscaler (VPA)** - Adjusts CPU/memory requests
3. **Cluster Autoscaler** - Adds/removes nodes

**HPA Configuration:**

\`\`\`yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Pods
        value: 1
        periodSeconds: 60
\`\`\`

**Cloud Provider Auto-scaling:**

- **AWS**: Auto Scaling Groups, ECS Service Auto Scaling
- **Azure**: VM Scale Sets, App Service Auto Scale
- **Google Cloud**: Managed Instance Groups, GKE Autopilot

**Benefits:**
- Cost optimization (scale down during low traffic)
- Handle traffic spikes automatically
- Improved availability
- Better resource utilization

## Security Considerations

Security must be built into every layer of modern applications, from infrastructure to application code.

### Authentication

Authentication verifies the identity of users and services attempting to access your system.

**Modern Authentication Patterns:**

**1. JWT (JSON Web Tokens)**

\`\`\`typescript
// Generating JWT
import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
  email: string;
  roles: string[];
}

function generateAccessToken(user: User): string {
  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
    roles: user.roles
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '15m',
    issuer: 'myapp.com',
    audience: 'api.myapp.com'
  });
}

function generateRefreshToken(userId: string): string {
  return jwt.sign(
    { userId },
    process.env.REFRESH_SECRET!,
    { expiresIn: '7d' }
  );
}

// Verifying JWT
function verifyToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token expired');
    }
    throw new Error('Invalid token');
  }
}

// Middleware
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}
\`\`\`

**2. OAuth 2.0 Integration**

OAuth 2.0 is the industry-standard protocol for authorization, commonly used for "Login with Google/GitHub/Facebook" features.

\`\`\`typescript
// OAuth 2.0 Authorization Code Flow
app.get('/auth/google', (req, res) => {
  const authUrl = \`https://accounts.google.com/o/oauth2/v2/auth?\${new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: 'https://myapp.com/auth/callback',
    response_type: 'code',
    scope: 'openid email profile',
    state: generateRandomState()
  })}\`;
  
  res.redirect(authUrl);
});

app.get('/auth/callback', async (req, res) => {
  const { code, state } = req.query;
  
  // Exchange code for tokens
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: 'https://myapp.com/auth/callback',
      grant_type: 'authorization_code'
    })
  });
  
  const { access_token, id_token } = await tokenResponse.json();
  
  // Verify and decode id_token
  const userInfo = jwt.decode(id_token);
  
  // Create or update user in database
  const user = await createOrUpdateUser(userInfo);
  
  // Generate your own JWT
  const appToken = generateAccessToken(user);
  
  res.cookie('token', appToken, { httpOnly: true, secure: true });
  res.redirect('/dashboard');
});
\`\`\`

**3. Multi-Factor Authentication (MFA)**

Adding an extra layer of security beyond passwords:

- **SMS/Email OTP**: One-time passwords sent to user's phone/email
- **Authenticator Apps**: TOTP (Time-based One-Time Password) using apps like Google Authenticator
- **Hardware Tokens**: Physical devices like YubiKey
- **Biometric**: Fingerprint, face recognition

**Best Practices:**
- Use HTTPS everywhere
- Store passwords with bcrypt/argon2 (never plaintext)
- Implement rate limiting on login endpoints
- Use secure session management
- Implement account lockout after failed attempts
- Support password reset flow securely
- Log authentication events for security monitoring

### Authorization

Authorization determines what authenticated users are allowed to do. It controls access to resources based on user permissions and roles.

**Authorization Models:**

**1. Role-Based Access Control (RBAC)**

\`\`\`typescript
enum Role {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user'
}

interface Permission {
  resource: string;
  actions: string[];
}

const rolePermissions: Record<Role, Permission[]> = {
  [Role.ADMIN]: [
    { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'products', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'orders', actions: ['create', 'read', 'update', 'delete'] }
  ],
  [Role.MANAGER]: [
    { resource: 'products', actions: ['create', 'read', 'update'] },
    { resource: 'orders', actions: ['read', 'update'] }
  ],
  [Role.USER]: [
    { resource: 'products', actions: ['read'] },
    { resource: 'orders', actions: ['create', 'read'] }
  ]
};

function hasPermission(
  userRole: Role,
  resource: string,
  action: string
): boolean {
  const permissions = rolePermissions[userRole];
  return permissions.some(
    p => p.resource === resource && p.actions.includes(action)
  );
}

// Middleware
function authorize(resource: string, action: string) {
  return (req, res, next) => {
    const user = req.user; // From authentication middleware
    
    if (!hasPermission(user.role, resource, action)) {
      return res.status(403).json({
        error: 'Insufficient permissions'
      });
    }
    
    next();
  };
}

// Usage
app.delete('/api/users/:id',
  authenticateJWT,
  authorize('users', 'delete'),
  deleteUser
);
\`\`\`

**2. Attribute-Based Access Control (ABAC)**

More fine-grained control based on attributes:

\`\`\`typescript
function canAccessDocument(user: User, document: Document): boolean {
  // Owner can access
  if (document.ownerId === user.id) {
    return true;
  }
  
  // Shared with user
  if (document.sharedWith.includes(user.id)) {
    return true;
  }
  
  // Public documents
  if (document.visibility === 'public') {
    return true;
  }
  
  // Department access
  if (document.department === user.department && user.role === 'manager') {
    return true;
  }
  
  return false;
}
\`\`\`

**Implementation Tips:**
- Principle of least privilege
- Separate authentication from authorization
- Centralize authorization logic
- Audit access attempts
- Use policy-as-code tools (Open Policy Agent)

### Data Encryption

Protecting sensitive data through encryption is critical for security and compliance.

**1. Data at Rest**

Encrypting data stored in databases, file systems, and backups:

\`\`\`typescript
import crypto from 'crypto';

class EncryptionService {
  private algorithm = 'aes-256-gcm';
  private key: Buffer;

  constructor() {
    // Key should be stored in secure key management system
    this.key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex');
  }

  encrypt(plaintext: string): { encrypted: string; iv: string; tag: string } {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const tag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      tag: tag.toString('hex')
    };
  }

  decrypt(encrypted: string, iv: string, tag: string): string {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.key,
      Buffer.from(iv, 'hex')
    );
    
    decipher.setAuthTag(Buffer.from(tag, 'hex'));
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}

// Usage
const encService = new EncryptionService();

// Encrypting sensitive user data
const { encrypted, iv, tag } = encService.encrypt(user.ssn);
await db.users.update({
  id: user.id,
  ssn_encrypted: encrypted,
  ssn_iv: iv,
  ssn_tag: tag
});
\`\`\`

**2. Data in Transit**

Use TLS/SSL for all network communication:

\`\`\`javascript
// Express.js with HTTPS
import https from 'https';
import fs from 'fs';

const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem'),
  // Enable only strong ciphers
  ciphers: 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384',
  honorCipherOrder: true,
  minVersion: 'TLSv1.2'
};

https.createServer(options, app).listen(443);

// Force HTTPS redirect
app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect(\`https://\${req.headers.host}\${req.url}\`);
  }
  next();
});

// Security headers
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});
\`\`\`

**Key Management:**

Never hard-code encryption keys. Use key management services:
- **AWS KMS** (Key Management Service)
- **Azure Key Vault**
- **Google Cloud KMS**
- **HashiCorp Vault**

**Compliance Considerations:**
- PCI-DSS for payment data
- HIPAA for healthcare data
- GDPR for EU user data
- SOC 2 for service organizations

**Best Practices:**
- Encrypt all sensitive data (PII, passwords, tokens)
- Use strong encryption algorithms (AES-256)
- Rotate encryption keys regularly
- Encrypt database backups
- Use field-level encryption for highly sensitive data
- Implement proper key lifecycle management
- Log encryption/decryption operations for audit`
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

Enterprise architecture provides a holistic view of an organization's IT landscape, defining the structure, components, and interactions that support business operations and strategic objectives.

### System Components

Understanding the building blocks of enterprise systems is crucial for designing scalable, maintainable solutions. Modern enterprise architectures typically follow a multi-tier approach with clear separation of concerns.

**Core Components:**

**1. Frontend Applications**

The user interface layer where users interact with the system.

\`\`\`
┌─────────────────────────────────┐
│     Frontend Applications       │
├─────────────────────────────────┤
│  • Web Applications (React/Vue) │
│  • Mobile Apps (iOS/Android)    │
│  • Desktop Applications         │
│  • Progressive Web Apps (PWA)   │
└─────────────────────────────────┘
\`\`\`

**Types:**
- **Single Page Applications (SPA)**: Dynamic, responsive web apps
- **Server-Side Rendered (SSR)**: Better SEO, faster initial load
- **Native Mobile Apps**: Platform-specific features and performance
- **Hybrid Apps**: Cross-platform using React Native, Flutter

**Key Considerations:**
- Responsive design for multiple devices
- Accessibility (WCAG compliance)
- Performance optimization (lazy loading, code splitting)
- State management (Redux, MobX, Context API)
- API integration and error handling

**2. Backend Services**

The business logic and data processing layer.

\`\`\`typescript
// Example Node.js/Express Service Structure
src/
├── controllers/      // Request handlers
│   ├── userController.ts
│   └── orderController.ts
├── services/        // Business logic
│   ├── userService.ts
│   └── orderService.ts
├── repositories/    // Data access
│   ├── userRepository.ts
│   └── orderRepository.ts
├── models/          // Data models
│   ├── User.ts
│   └── Order.ts
├── middleware/      // Cross-cutting concerns
│   ├── auth.ts
│   ├── validation.ts
│   └── errorHandler.ts
├── routes/          // API endpoints
│   ├── userRoutes.ts
│   └── orderRoutes.ts
└── app.ts           // Application entry point
\`\`\`

**Responsibilities:**
- API endpoint implementation
- Business logic execution
- Data validation and transformation
- Authentication and authorization
- External service integration
- Background job processing

**3. Data Storage Layers**

Persistent storage for application data.

**Relational Databases (SQL):**
- PostgreSQL: Feature-rich, excellent for complex queries
- MySQL: Popular, good for web applications
- SQL Server: Enterprise-grade, Windows integration

**Use Cases:**
- Structured data with relationships
- ACID transactions required
- Complex queries and joins
- Referential integrity

\`\`\`sql
-- Example Schema Design
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
\`\`\`

**NoSQL Databases:**
- MongoDB: Document store, flexible schema
- Redis: Key-value store, in-memory caching
- Cassandra: Wide-column store, highly scalable
- DynamoDB: AWS managed NoSQL

**Use Cases:**
- Unstructured or semi-structured data
- High write throughput
- Horizontal scalability
- Flexible schema evolution

**4. Message Queues**

Asynchronous communication between services.

**Popular Options:**
- RabbitMQ: Feature-rich message broker
- Apache Kafka: High-throughput event streaming
- AWS SQS: Managed queue service
- Redis Pub/Sub: Simple pub/sub messaging

**Use Cases:**

\`\`\`typescript
// Email notification queue
interface EmailJob {
  to: string;
  subject: string;
  body: string;
  priority: 'high' | 'medium' | 'low';
}

// Producer (Order Service)
async function sendOrderConfirmation(order: Order) {
  const emailJob: EmailJob = {
    to: order.userEmail,
    subject: 'Order Confirmation',
    body: \`Your order #\${order.id} has been confirmed\`,
    priority: 'high'
  };
  
  await queue.publish('email-queue', emailJob);
}

// Consumer (Email Service)
queue.subscribe('email-queue', async (job: EmailJob) => {
  await emailService.send(job);
  console.log(\`Email sent to \${job.to}\`);
});
\`\`\`

**Benefits:**
- Decoupling of services
- Load leveling and buffering
- Retry logic and error handling
- Asynchronous processing
- Event-driven architecture

**5. Caching Layers**

Temporary storage for frequently accessed data.

**Caching Strategy:**

\`\`\`
Request Flow:
1. Check Cache → Hit? Return cached data
                ↓ Miss?
2. Query Database → Store in Cache → Return data
\`\`\`

**Implementation:**

\`\`\`typescript
class CacheService {
  constructor(private redis: Redis) {}

  async get<T>(key: string): Promise<T | null> {
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }

  async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    await this.redis.setex(key, ttl, JSON.stringify(value));
  }

  async invalidate(key: string): Promise<void> {
    await this.redis.del(key);
  }
}

// Usage in service layer
async function getUser(userId: string): Promise<User> {
  const cacheKey = \`user:\${userId}\`;
  
  // Try cache first
  let user = await cache.get<User>(cacheKey);
  
  if (!user) {
    // Cache miss - fetch from database
    user = await userRepository.findById(userId);
    
    // Store in cache for 1 hour
    await cache.set(cacheKey, user, 3600);
  }
  
  return user;
}
\`\`\`

**Cache Invalidation Strategies:**
- Time-based expiration (TTL)
- Write-through (update cache on write)
- Write-behind (async cache updates)
- Cache-aside (lazy loading)
- Event-based invalidation

### Integration Points

Integration points define how different systems communicate and share data. Proper integration architecture ensures reliability, scalability, and maintainability.

**Integration Patterns:**

**1. RESTful APIs**

Standard HTTP-based communication:

\`\`\`typescript
// REST API Design
// Resource-based URLs
GET    /api/v1/users          // List users
GET    /api/v1/users/:id      // Get user
POST   /api/v1/users          // Create user
PUT    /api/v1/users/:id      // Update user
DELETE /api/v1/users/:id      // Delete user

// Nested resources
GET    /api/v1/users/:id/orders  // Get user's orders

// Filtering, sorting, pagination
GET    /api/v1/users?role=admin&sort=created_at&page=1&limit=20
\`\`\`

**Best Practices:**
- Use HTTP methods correctly (GET, POST, PUT, DELETE)
- Version your APIs (/v1/, /v2/)
- Implement proper error responses
- Use HATEOAS for discoverability
- Implement rate limiting
- Document with OpenAPI/Swagger

**2. GraphQL**

Query language for flexible data fetching:

\`\`\`graphql
# Query multiple resources in single request
query {
  user(id: "123") {
    id
    name
    email
    orders(limit: 5) {
      id
      totalAmount
      items {
        productName
        quantity
        price
      }
    }
  }
}
\`\`\`

**Advantages:**
- Fetch exactly what you need
- Reduce over-fetching and under-fetching
- Strong typing system
- Single endpoint
- Real-time updates with subscriptions

**3. Event-Driven Integration**

Services communicate through events:

\`\`\`typescript
// Event Publisher
class OrderService {
  async createOrder(orderData: CreateOrderDTO) {
    const order = await this.orderRepo.create(orderData);
    
    // Publish event
    await this.eventBus.publish('order.created', {
      orderId: order.id,
      userId: order.userId,
      totalAmount: order.totalAmount,
      timestamp: new Date()
    });
    
    return order;
  }
}

// Event Subscribers
class InventoryService {
  @Subscribe('order.created')
  async handleOrderCreated(event: OrderCreatedEvent) {
    await this.reserveInventory(event.orderId);
  }
}

class NotificationService {
  @Subscribe('order.created')
  async handleOrderCreated(event: OrderCreatedEvent) {
    await this.sendOrderConfirmation(event.userId, event.orderId);
  }
}
\`\`\`

**Benefits:**
- Loose coupling between services
- Better scalability
- Event sourcing capabilities
- Audit trail of all events
- Time-travel debugging

**4. API Gateway Integration**

Centralized entry point for all clients:

\`\`\`
Client → API Gateway → Service A
                    → Service B
                    → Service C
\`\`\`

**Features:**
- Request routing
- Authentication/Authorization
- Rate limiting
- Request/Response transformation
- Caching
- Monitoring and logging

### Data Flow

Understanding how data moves through your system is essential for debugging, optimization, and ensuring data consistency.

**Typical Request Flow:**

\`\`\`
1. User Action (Click button)
   ↓
2. Frontend makes API call
   ↓
3. Load Balancer routes request
   ↓
4. API Gateway (authentication, rate limiting)
   ↓
5. Backend Service receives request
   ↓
6. Service validates input
   ↓
7. Check cache for data
   ↓ (cache miss)
8. Query database
   ↓
9. Transform data for response
   ↓
10. Store in cache
   ↓
11. Return response to client
   ↓
12. Frontend updates UI
\`\`\`

**Data Flow Patterns:**

**1. Read-Heavy Pattern:**

\`\`\`
User Request → Cache (Redis) → Primary DB
                ↓ Hit
              Return
\`\`\`

**Optimization:**
- Aggressive caching
- Read replicas
- CDN for static content
- Query optimization

**2. Write-Heavy Pattern:**

\`\`\`
User Request → Write to Primary DB
                ↓
             Async replication to Read Replicas
                ↓
             Publish event to queue
                ↓
             Background processing
\`\`\`

**Optimization:**
- Write batching
- Async processing
- Database sharding
- Queue for background jobs

**3. Real-Time Pattern:**

\`\`\`
User Action → WebSocket Connection
                ↓
             Server pushes updates
                ↓
             Multiple clients receive
\`\`\`

**Use Cases:**
- Chat applications
- Live dashboards
- Collaborative editing
- Stock tickers

**Monitoring Data Flow:**

\`\`\`typescript
// Distributed tracing with correlation IDs
app.use((req, res, next) => {
  req.correlationId = req.headers['x-correlation-id'] || uuid();
  res.setHeader('x-correlation-id', req.correlationId);
  
  logger.info('Request received', {
    correlationId: req.correlationId,
    method: req.method,
    path: req.path,
    timestamp: new Date()
  });
  
  next();
});

// Pass correlation ID to downstream services
async function callDownstreamService(correlationId: string) {
  return fetch('https://api.example.com/data', {
    headers: {
      'x-correlation-id': correlationId
    }
  });
}
\`\`\`

## Scalability and Performance

Scalability and performance are critical concerns in enterprise architecture. Systems must handle growing user bases and data volumes while maintaining responsiveness.

### Caching Strategies

Caching is one of the most effective ways to improve application performance. Implementing caching at multiple levels creates a fast, responsive user experience.

**Multi-Layer Caching Architecture:**

\`\`\`
┌──────────────────┐
│  Browser Cache   │ ← 1. Client-side cache
└────────┬─────────┘
         ↓
┌──────────────────┐
│   CDN Cache      │ ← 2. Edge caching
└────────┬─────────┘
         ↓
┌──────────────────┐
│ Application Cache│ ← 3. Server-side cache (Redis)
└────────┬─────────┘
         ↓
┌──────────────────┐
│  Database Cache  │ ← 4. Query result cache
└────────┬─────────┘
         ↓
┌──────────────────┐
│    Database      │ ← 5. Disk storage
└──────────────────┘
\`\`\`

**1. Browser Caching**

Leverage HTTP caching headers:

\`\`\`typescript
// Express.js cache headers
app.get('/static/*', (req, res) => {
  res.set({
    'Cache-Control': 'public, max-age=31536000', // 1 year
    'ETag': generateETag(req.path),
    'Last-Modified': getLastModified(req.path)
  });
  res.sendFile(req.path);
});

// API responses with conditional caching
app.get('/api/products', (req, res) => {
  const products = getProducts();
  const etag = generateETag(products);
  
  if (req.headers['if-none-match'] === etag) {
    return res.status(304).end(); // Not Modified
  }
  
  res.set({
    'Cache-Control': 'private, max-age=300', // 5 minutes
    'ETag': etag
  });
  res.json(products);
});
\`\`\`

**2. CDN Caching**

Content Delivery Networks distribute static assets globally:

**Benefits:**
- Reduced latency (geographically close to users)
- Reduced server load
- Better availability and redundancy
- DDoS protection

**Configuration Example:**
\`\`\`javascript
// Cloudflare cache rules
const cacheRules = {
  '/*.css': 'cache for 1 year',
  '/*.js': 'cache for 1 year',
  '/*.jpg|png|webp': 'cache for 1 month',
  '/api/*': 'bypass cache',
  '/': 'cache for 1 hour'
};
\`\`\`

**3. Application-Level Caching**

Redis/Memcached for frequently accessed data:

\`\`\`typescript
class ProductService {
  constructor(
    private redis: Redis,
    private productRepo: ProductRepository
  ) {}

  async getProduct(id: string): Promise<Product> {
    const cacheKey = \`product:\${id}\`;
    
    // Try cache
    const cached = await this.redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
    
    // Cache miss - fetch from DB
    const product = await this.productRepo.findById(id);
    
    // Store with 1 hour TTL
    await this.redis.setex(
      cacheKey,
      3600,
      JSON.stringify(product)
    );
    
    return product;
  }

  async updateProduct(id: string, data: Partial<Product>) {
    const product = await this.productRepo.update(id, data);
    
    // Invalidate cache
    await this.redis.del(\`product:\${id}\`);
    
    // Update cache with new data
    await this.redis.setex(
      \`product:\${id}\`,
      3600,
      JSON.stringify(product)
    );
    
    return product;
  }
}
\`\`\`

**4. Database Query Caching**

PostgreSQL query result caching:

\`\`\`sql
-- Materialized views for expensive queries
CREATE MATERIALIZED VIEW monthly_sales_summary AS
SELECT 
  DATE_TRUNC('month', created_at) AS month,
  COUNT(*) as order_count,
  SUM(total_amount) as total_revenue
FROM orders
GROUP BY month;

-- Refresh periodically
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales_summary;
\`\`\`

**Cache Invalidation:**

Famous quote: "There are only two hard things in Computer Science: cache invalidation and naming things."

**Strategies:**

\`\`\`typescript
// 1. Time-based (TTL)
await cache.setex(key, 3600, value); // Expires in 1 hour

// 2. Event-based
eventBus.on('product.updated', async (productId) => {
  await cache.del(\`product:\${productId}\`);
});

// 3. Tag-based invalidation
await cache.set(\`product:123\`, product, {
  tags: ['products', 'category:electronics']
});

// Invalidate all products in category
await cache.invalidateByTag('category:electronics');

// 4. Write-through cache
async function updateProduct(id, data) {
  const product = await db.products.update(id, data);
  await cache.set(\`product:\${id}\`, product); // Update cache immediately
  return product;
}
\`\`\`

### Database Optimization

Database performance is often the bottleneck in applications. Proper optimization can dramatically improve response times.

**1. Indexing Strategies**

Indexes speed up data retrieval but slow down writes:

\`\`\`sql
-- Single column index
CREATE INDEX idx_users_email ON users(email);

-- Composite index (order matters!)
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Partial index (smaller, faster)
CREATE INDEX idx_active_orders ON orders(user_id) 
WHERE status IN ('pending', 'processing');

-- Covering index (includes all queried columns)
CREATE INDEX idx_orders_summary ON orders(user_id, created_at) 
INCLUDE (total_amount, status);

-- Full-text search index
CREATE INDEX idx_products_search ON products 
USING GIN(to_tsvector('english', name || ' ' || description));
\`\`\`

**Index Analysis:**

\`\`\`sql
-- Check index usage
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan as index_scans,
  idx_tup_read as tuples_read,
  idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- Find unused indexes
SELECT 
  schemaname,
  tablename,
  indexname
FROM pg_stat_user_indexes
WHERE idx_scan = 0
AND indexrelname NOT LIKE 'pg_toast%';
\`\`\`

**2. Query Optimization**

\`\`\`sql
-- Bad: N+1 query problem
SELECT * FROM users;
-- Then for each user:
SELECT * FROM orders WHERE user_id = ?;

-- Good: JOIN to fetch in one query
SELECT 
  u.*,
  o.id as order_id,
  o.total_amount,
  o.created_at as order_date
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

-- Better: Aggregate data in database
SELECT 
  u.id,
  u.name,
  COUNT(o.id) as order_count,
  SUM(o.total_amount) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;
\`\`\`

**Query Profiling:**

\`\`\`sql
-- Explain query plan
EXPLAIN ANALYZE
SELECT * FROM orders 
WHERE user_id = '123' 
AND status = 'pending';

-- Example output analysis:
--  Index Scan using idx_orders_user_status on orders
--    Index Cond: (user_id = '123' AND status = 'pending')
--    Planning Time: 0.123 ms
--    Execution Time: 0.456 ms
\`\`\`

**3. Connection Pooling**

Reuse database connections instead of creating new ones:

\`\`\`typescript
// PostgreSQL connection pool
import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'myapp',
  user: 'dbuser',
  password: 'dbpass',
  max: 20,                 // Maximum connections
  idleTimeoutMillis: 30000, // Close idle connections after 30s
  connectionTimeoutMillis: 2000, // Timeout connecting
});

// Use pool for queries
async function getUser(id: string) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  } finally {
    client.release(); // Return connection to pool
  }
}
\`\`\`

**4. Read Replicas**

Scale reads by distributing across multiple database copies:

\`\`\`typescript
class DatabaseManager {
  private primary: Pool;    // Write operations
  private replicas: Pool[]; // Read operations
  private replicaIndex = 0;

  writeQuery(sql: string, params: any[]) {
    return this.primary.query(sql, params);
  }

  readQuery(sql: string, params: any[]) {
    // Round-robin load balancing across replicas
    const replica = this.replicas[this.replicaIndex];
    this.replicaIndex = (this.replicaIndex + 1) % this.replicas.length;
    return replica.query(sql, params);
  }
}

// Usage
await db.writeQuery('INSERT INTO users ...', [data]);  // → Primary
await db.readQuery('SELECT * FROM users ...', [id]);   // → Replica
\`\`\`

### Horizontal Scaling

Distributing load across multiple server instances enables virtually unlimited scalability.

**Implementation Requirements:**

**1. Stateless Application Design**

\`\`\`typescript
// Bad: Server-side session state
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  store: new MemoryStore() // ❌ Stored in server memory
}));

// Good: Distributed session store
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({  // ✅ Shared across all servers
    client: redisClient,
    prefix: 'sess:'
  })
}));

// Better: Stateless with JWT
app.use(authenticateJWT);  // ✅ No server-side session at all
\`\`\`

**2. Load Balancer Configuration**

NGINX load balancing:

\`\`\`nginx
upstream backend {
    least_conn;  # Route to server with least connections
    
    server backend1.example.com:3000 weight=3;
    server backend2.example.com:3000 weight=2;
    server backend3.example.com:3000 weight=1;
    
    # Health checks
    check interval=3000 rise=2 fall=3 timeout=1000;
}

server {
    listen 80;
    
    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        
        # Connection pooling
        proxy_http_version 1.1;
        proxy_set_header Connection "";
    }
}
\`\`\`

**3. Auto-Scaling Rules**

AWS Auto Scaling Group:

\`\`\`json
{
  "AutoScalingGroupName": "web-servers-asg",
  "MinSize": 2,
  "MaxSize": 10,
  "DesiredCapacity": 3,
  "HealthCheckType": "ELB",
  "HealthCheckGracePeriod": 300,
  "TargetGroupARNs": ["arn:aws:elasticloadbalancing:..."],
  "Policies": [
    {
      "PolicyName": "scale-up-on-cpu",
      "ScalingAdjustment": 2,
      "AdjustmentType": "ChangeInCapacity",
      "Cooldown": 300,
      "MetricAggregationType": "Average",
      "TargetTrackingConfiguration": {
        "PredefinedMetricSpecification": {
          "PredefinedMetricType": "ASGAverageCPUUtilization"
        },
        "TargetValue": 70.0
      }
    }
  ]
}
\`\`\`

## Common Design Patterns

Design patterns solve recurring problems in software design. Understanding and applying them leads to better code organization and maintainability.

### MVC Pattern

Model-View-Controller separates application logic into three interconnected components.

\`\`\`
User → View → Controller → Model → Database
        ↑         ↓
        └─────────┘
\`\`\`

**Implementation:**

\`\`\`typescript
// Model - Data and business logic
class User {
  constructor(
    public id: string,
    public email: string,
    public name: string
  ) {}

  static async findById(id: string): Promise<User | null> {
    const result = await db.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] ? new User(...result.rows[0]) : null;
  }

  async save(): Promise<void> {
    await db.query(
      'UPDATE users SET email = $1, name = $2 WHERE id = $3',
      [this.email, this.name, this.id]
    );
  }
}

// Controller - Request handling and coordination
class UserController {
  async getUser(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      user.name = req.body.name;
      user.email = req.body.email;
      await user.save();
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

// View - React component
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
}
\`\`\`

### Observer Pattern

Establishes one-to-many relationships where observers are automatically notified of state changes.

\`\`\`typescript
// Implementation
interface Observer {
  update(subject: Subject): void;
}

interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

class StockPrice implements Subject {
  private observers: Observer[] = [];
  private price: number;

  constructor(private symbol: string, initialPrice: number) {
    this.price = initialPrice;
  }

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(): void {
    this.observers.forEach(observer => observer.update(this));
  }

  setPrice(newPrice: number): void {
    this.price = newPrice;
    this.notify();
  }

  getPrice(): number {
    return this.price;
  }
}

// Observers
class StockDisplay implements Observer {
  update(subject: StockPrice): void {
    console.log(\`Stock display updated: \${subject.getPrice()}\`);
  }
}

class AlertSystem implements Observer {
  constructor(private threshold: number) {}

  update(subject: StockPrice): void {
    if (subject.getPrice() > this.threshold) {
      console.log(\`ALERT: Price exceeded \${this.threshold}\`);
    }
  }
}

// Usage
const stock = new StockPrice('AAPL', 150);
stock.attach(new StockDisplay());
stock.attach(new AlertSystem(160));

stock.setPrice(165); // Notifies all observers
\`\`\`

### Factory Pattern

Centralizes object creation logic to improve maintainability and flexibility.

\`\`\`typescript
// Document factory example
interface Document {
  open(): void;
  save(): void;
  close(): void;
}

class PDFDocument implements Document {
  open() { console.log('Opening PDF document'); }
  save() { console.log('Saving PDF document'); }
  close() { console.log('Closing PDF document'); }
}

class WordDocument implements Document {
  open() { console.log('Opening Word document'); }
  save() { console.log('Saving Word document'); }
  close() { console.log('Closing Word document'); }
}

class ExcelDocument implements Document {
  open() { console.log('Opening Excel spreadsheet'); }
  save() { console.log('Saving Excel spreadsheet'); }
  close() { console.log('Closing Excel spreadsheet'); }
}

// Factory
class DocumentFactory {
  static createDocument(type: string): Document {
    switch (type.toLowerCase()) {
      case 'pdf':
        return new PDFDocument();
      case 'word':
      case 'docx':
        return new WordDocument();
      case 'excel':
      case 'xlsx':
        return new ExcelDocument();
      default:
        throw new Error(\`Unsupported document type: \${type}\`);
    }
  }
}

// Usage
const doc = DocumentFactory.createDocument('pdf');
doc.open();
doc.save();
doc.close();
\`\`\`

## Deployment Strategies

Modern deployment strategies enable rapid, reliable releases with minimal downtime and risk.

### Blue-Green Deployment

Running two identical production environments (blue and green) and switching traffic between them.

**Process:**

\`\`\`
Current State: Blue (v1.0) ← 100% traffic
                Green (idle)

1. Deploy v1.1 to Green
2. Test Green environment
3. Switch traffic to Green ← 100% traffic
4. Blue becomes idle (quick rollback if needed)
\`\`\`

**Implementation:**

\`\`\`bash
# Load balancer configuration switch
# Before
upstream backend {
    server blue-env.example.com:80;
}

# After
upstream backend {
    server green-env.example.com:80;
}

# Or use weighted routing for gradual switch
upstream backend {
    server blue-env.example.com:80 weight=10;
    server green-env.example.com:80 weight=90;
}
\`\`\`

**Advantages:**
- Zero downtime deployments
- Instant rollback capability
- Full production testing before switch
- Reduced risk

**Disadvantages:**
- Requires double infrastructure (costly)
- Database migrations can be complex
- Session management during switch

**AWS Implementation:**

\`\`\`json
{
  "DeploymentStrategy": "BlueGreen",
  "BlueEnvironment": {
    "LoadBalancer": "blue-lb",
    "TargetGroup": "blue-tg",
    "Instances": ["i-abc123", "i-def456"]
  },
  "GreenEnvironment": {
    "LoadBalancer": "green-lb",
    "TargetGroup": "green-tg",
    "Instances": ["i-ghi789", "i-jkl012"]
  },
  "TrafficShift": {
    "Type": "AllAtOnce",
    "WaitIntervalInSeconds": 0
  }
}
\`\`\`

### Canary Releases

Gradually rolling out changes to a small subset of users before full deployment.

**Process:**

\`\`\`
Phase 1: 95% → v1.0, 5% → v1.1 (canary)
  ↓ Monitor metrics
Phase 2: 80% → v1.0, 20% → v1.1
  ↓ Monitor metrics
Phase 3: 50% → v1.0, 50% → v1.1
  ↓ Monitor metrics
Phase 4: 0% → v1.0, 100% → v1.1 (complete)
\`\`\`

**Implementation:**

\`\`\`nginx
# NGINX canary routing
upstream stable {
    server stable-v1.example.com:80;
}

upstream canary {
    server canary-v2.example.com:80;
}

split_clients "\${remote_addr}" $variant {
    5%     canary;   # 5% of users get canary
    *      stable;   # 95% get stable version
}

server {
    listen 80;
    
    location / {
        proxy_pass http://$variant;
    }
}
\`\`\`

**Monitoring During Canary:**

\`\`\`typescript
// Metrics to watch
interface CanaryMetrics {
  errorRate: number;      // Should be similar to stable
  latency: number;        // Should be similar to stable
  throughput: number;     // Should handle expected load
  userComplaints: number; // Should not spike
}

function evaluateCanary(
  stableMetrics: CanaryMetrics,
  canaryMetrics: CanaryMetrics
): 'continue' | 'rollback' {
  // Error rate threshold
  if (canaryMetrics.errorRate > stableMetrics.errorRate * 1.5) {
    return 'rollback';
  }
  
  // Latency threshold
  if (canaryMetrics.latency > stableMetrics.latency * 1.3) {
    return 'rollback';
  }
  
  return 'continue';
}
\`\`\`

**Advantages:**
- Reduced risk (limited blast radius)
- Real-world testing with actual users
- Gradual rollout allows monitoring
- Easy rollback for small user group

**Disadvantages:**
- More complex deployment process
- Requires sophisticated routing
- Need good monitoring and metrics
- Session management complexity

### Rolling Updates

Incrementally updating instances without taking the entire system offline.

**Process:**

\`\`\`
Servers: [v1.0] [v1.0] [v1.0] [v1.0] [v1.0]

Step 1:  [v1.1] [v1.0] [v1.0] [v1.0] [v1.0]
Step 2:  [v1.1] [v1.1] [v1.0] [v1.0] [v1.0]
Step 3:  [v1.1] [v1.1] [v1.1] [v1.0] [v1.0]
Step 4:  [v1.1] [v1.1] [v1.1] [v1.1] [v1.0]
Step 5:  [v1.1] [v1.1] [v1.1] [v1.1] [v1.1]
\`\`\`

**Kubernetes Rolling Update:**

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1       # Max extra pods during update
      maxUnavailable: 1  # Max pods unavailable
  template:
    spec:
      containers:
      - name: myapp
        image: myapp:v1.1
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
\`\`\`

**Deployment Script:**

\`\`\`bash
#!/bin/bash
# Rolling update script

SERVERS=("server1" "server2" "server3" "server4" "server5")
NEW_VERSION="v1.1"

for server in "\${SERVERS[@]}"; do
  echo "Updating $server..."
  
  # Remove from load balancer
  aws elb deregister-instances-from-load-balancer \\
    --load-balancer-name my-lb \\
    --instances $server
  
  # Wait for connections to drain
  sleep 30
  
  # Deploy new version
  ssh $server "docker pull myapp:$NEW_VERSION && \\
              docker stop myapp && \\
              docker run -d --name myapp myapp:$NEW_VERSION"
  
  # Health check
  until $(curl --output /dev/null --silent --head --fail http://$server/health); do
    echo "Waiting for $server to be healthy..."
    sleep 5
  done
  
  # Add back to load balancer
  aws elb register-instances-with-load-balancer \\
    --load-balancer-name my-lb \\
    --instances $server
  
  echo "$server updated successfully"
done

echo "Rolling update complete!"
\`\`\`

**Advantages:**
- No downtime
- Gradual migration reduces risk
- Can pause/resume deployment
- Works with existing infrastructure

**Disadvantages:**
- Slower than blue-green
- Both versions running simultaneously
- Rollback requires reverse rolling update
- Database compatibility between versions

**Rollback Procedure:**

\`\`\`bash
# Kubernetes rollback
kubectl rollout undo deployment/myapp

# Rollback to specific revision
kubectl rollout undo deployment/myapp --to-revision=2

# Check rollout status
kubectl rollout status deployment/myapp
\`\`\`

**Best Practices:**
- Always use health checks
- Implement proper monitoring
- Test backwards compatibility
- Have automated rollback triggers
- Use feature flags for risky changes
- Document deployment procedures`
  }
];
