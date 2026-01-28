import { Users, BarChart3, CreditCard, BookOpen, Shield, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { StudentManagementUI, FinanceManagementUI, AnalyticsUI } from './ui-elements'

const features = [
  {
    icon: Users,
    title: 'Student Management',
    description: 'Track enrollment, attendance, performance, and communications in one place.',
    color: 'from-primary to-primary/50',
  },
  {
    icon: CreditCard,
    title: 'Payments & Finance',
    description: 'Manage school fees, process payments, and generate financial reports effortlessly.',
    color: 'from-secondary to-secondary/50',
  },
  {
    icon: BookOpen,
    title: 'Academic Tracking',
    description: 'Monitor grades, assignments, exams, and curriculum progress in real-time.',
    color: 'from-accent to-accent/50',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description: 'Gain insights with powerful dashboards and customizable reports.',
    color: 'from-primary to-accent',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Bank-level security with encrypted data and regular backups.',
    color: 'from-secondary to-accent',
  },
  {
    icon: Zap,
    title: 'Fast & Easy',
    description: 'Intuitive interface designed for educators, no technical knowledge needed.',
    color: 'from-accent to-primary',
  },
]

export function Features() {
  const [visibleFeatures, setVisibleFeatures] = useState<boolean[]>([])

  useEffect(() => {
    features.forEach((_, index) => {
      setTimeout(() => {
        setVisibleFeatures((prev) => [...prev, true])
      }, index * 100)
    })
  }, [])

  return (
    <section id="features" className="py-20 bg-linear-to-b from-background via-card/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything your school needs to succeed in the digital age
          </p>
        </div>

        {/* Features with UI Elements Showcase */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              See It In Action
            </h3>
            <p className="text-muted-foreground">
              Real-time visualizations of EduPay360's powerful tools at work
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            <StudentManagementUI />
            <FinanceManagementUI />
            <AnalyticsUI />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className={`group relative p-8 rounded-xl border border-border bg-card/50 hover:bg-card transition-all duration-500 transform ${
                  visibleFeatures[index]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                {/* Background gradient */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-500`}
                />

                {/* Icon */}
                <div className="relative mb-4 inline-block">
                  <div
                    className={`w-14 h-14 rounded-lg bg-linear-to-br ${feature.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-2 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground relative z-10">{feature.description}</p>

                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-primary to-secondary w-0 group-hover:w-full transition-all duration-500 rounded-b-xl" />
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            Ready to transform your school management?
          </p>
          <button className="px-8 py-3 bg-linear-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  )
}
