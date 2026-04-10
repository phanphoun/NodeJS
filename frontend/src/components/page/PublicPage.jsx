import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Card from "../ui/Card";

const PublicPage = () => {
    const navigate = useNavigate();

    const features = [
        {
            title: "Easy Authentication",
            description: "Secure and simple login/register process with role-based access control.",
            icon: "🔐"
        },
        {
            title: "Role-Based Dashboard",
            description: "Personalized experience based on your role - User, Admin, or Manager.",
            icon: "👥"
        },
        {
            title: "Modern UI/UX",
            description: "Clean, responsive design with smooth interactions and transitions.",
            icon: "✨"
        },
        {
            title: "Real-Time Updates",
            description: "Stay connected with instant notifications and live data updates.",
            icon: "⚡"
        },
        {
            title: "Secure Platform",
            description: "Enterprise-grade security with JWT authentication and data protection.",
            icon: "🛡️"
        },
        {
            title: "Scalable Architecture",
            description: "Built with modern technologies for performance and reliability.",
            icon: "🚀"
        }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Product Manager",
            content: "This platform has transformed how we manage our team. The role-based access is exactly what we needed.",
            rating: 5
        },
        {
            name: "Mike Chen",
            role: "Developer",
            content: "The authentication system is robust and the UI is incredibly intuitive. Best platform I've used.",
            rating: 5
        },
        {
            name: "Emily Davis",
            role: "Team Lead",
            content: "Finally, a platform that understands different user roles. Makes our workflow so much smoother.",
            rating: 5
        }
    ];

    const renderStars = (rating) => {
        return "★".repeat(rating) + "☆".repeat(5 - rating);
    };

    return (
        <div style={{ 
            fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
            lineHeight: '1.6',
            color: '#333'
        }}>
            {/* Hero Section */}
            <section style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '100px 20px',
                textAlign: 'center',
                position: 'relative'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h1 style={{ 
                        fontSize: '3.5rem', 
                        marginBottom: '20px',
                        fontWeight: '700',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}>
                        Welcome to Your Next-Gen Platform
                    </h1>
                    <p style={{ 
                        fontSize: '1.5rem', 
                        marginBottom: '40px',
                        opacity: 0.95,
                        maxWidth: '600px',
                        margin: '0 auto 40px'
                    }}>
                        Experience seamless authentication, role-based access, and modern UI design. 
                        Built for teams that value security and efficiency.
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button 
                            onClick={() => navigate('/register')}
                            variant="success"
                            size="large"
                            style={{
                                padding: '15px 40px',
                                fontSize: '18px',
                                fontWeight: '600',
                                boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)'
                            }}
                        >
                            Get Started Free
                        </Button>
                        <Button 
                            onClick={() => navigate('/login')}
                            variant="outline"
                            size="large"
                            style={{
                                padding: '15px 40px',
                                fontSize: '18px',
                                fontWeight: '600',
                                backgroundColor: 'transparent',
                                color: 'white',
                                borderColor: 'white',
                                borderWidth: '2px'
                            }}
                        >
                            Sign In
                        </Button>
                    </div>
                    <p style={{ marginTop: '30px', opacity: 0.8, fontSize: '14px' }}>
                        ✨ No credit card required • Free forever for basic features
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section style={{ padding: '80px 20px', backgroundColor: '#f8f9fa' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#333' }}>
                            Why Choose Our Platform?
                        </h2>
                        <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                            Discover the features that make our platform the preferred choice for teams worldwide
                        </p>
                    </div>
                    
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                        gap: '30px' 
                    }}>
                        {features.map((feature, index) => (
                            <Card 
                                key={index}
                                variant="elevated"
                                hover={true}
                                style={{
                                    textAlign: 'center',
                                    padding: '40px 30px',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                                }}
                            >
                                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>
                                    {feature.title}
                                </h3>
                                <p style={{ color: '#666', lineHeight: '1.6' }}>
                                    {feature.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section style={{ padding: '80px 20px', backgroundColor: 'white' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#333' }}>
                            What Our Users Say
                        </h2>
                        <p style={{ fontSize: '1.2rem', color: '#666' }}>
                            Join thousands of satisfied users who trust our platform
                        </p>
                    </div>
                    
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                        gap: '30px' 
                    }}>
                        {testimonials.map((testimonial, index) => (
                            <Card 
                                key={index}
                                variant="default"
                                style={{ padding: '30px' }}
                            >
                                <div style={{ 
                                    fontSize: '1.2rem', 
                                    color: '#ffc107', 
                                    marginBottom: '15px' 
                                }}>
                                    {renderStars(testimonial.rating)}
                                </div>
                                <p style={{ 
                                    fontStyle: 'italic', 
                                    marginBottom: '20px', 
                                    color: '#555',
                                    lineHeight: '1.6'
                                }}>
                                    "{testimonial.content}"
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                        fontSize: '20px'
                                    }}>
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600', color: '#333' }}>
                                            {testimonial.name}
                                        </div>
                                        <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '80px 20px',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
                        Ready to Get Started?
                    </h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: '40px', opacity: 0.95 }}>
                        Join thousands of users who have already transformed their workflow. 
                        Start your journey today!
                    </p>
                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button 
                            onClick={() => navigate('/register')}
                            variant="success"
                            size="large"
                            style={{
                                padding: '15px 40px',
                                fontSize: '18px',
                                fontWeight: '600',
                                boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)'
                            }}
                        >
                            Start Free Trial
                        </Button>
                        <Button 
                            onClick={() => navigate('/login')}
                            variant="outline"
                            size="large"
                            style={{
                                padding: '15px 40px',
                                fontSize: '18px',
                                fontWeight: '600',
                                backgroundColor: 'transparent',
                                color: 'white',
                                borderColor: 'white',
                                borderWidth: '2px'
                            }}
                        >
                            Sign In to Account
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ 
                backgroundColor: '#2c3e50', 
                color: 'white', 
                padding: '40px 20px', 
                textAlign: 'center' 
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <p style={{ marginBottom: '20px', fontSize: '1.1rem' }}>
                        2024 Your Platform. All rights reserved.
                    </p>
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        gap: '30px', 
                        flexWrap: 'wrap' 
                    }}>
                        <span style={{ cursor: 'pointer', opacity: 0.8, transition: 'opacity 0.2s' }}>
                            Privacy Policy
                        </span>
                        <span style={{ cursor: 'pointer', opacity: 0.8, transition: 'opacity 0.2s' }}>
                            Terms of Service
                        </span>
                        <span style={{ cursor: 'pointer', opacity: 0.8, transition: 'opacity 0.2s' }}>
                            Contact Us
                        </span>
                        <span style={{ cursor: 'pointer', opacity: 0.8, transition: 'opacity 0.2s' }}>
                            About
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PublicPage;