import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
              Last updated: August 12, 2025
            </Badge>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Privacy Policy</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Please read this Privacy Policy carefully before using PlantMD
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Introduction */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700">
                Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none p-6">
              <p>
                Welcome to PlantMD ("we", "our", or "us"). Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application, website, and associated services (collectively, the "Service").
              </p>
              <p>
                By using the PlantMD app, you agree to the terms of this Privacy Policy.
              </p>
            </CardContent>
          </Card>

          {/* Important Disclaimer */}
          <Card className="border-red-200">
            <CardHeader className="bg-red-50">
              <CardTitle className="text-red-700">
                Important Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-red-100 border border-red-300 rounded-lg p-4">
                <p className="text-red-800 font-medium mb-2">
                  ⚠️ Plant Diagnosis Disclaimer
                </p>
                <p className="text-red-700 text-sm leading-relaxed">
                  PlantMD provides AI-powered plant diagnosis and care recommendations for informational purposes only. 
                  While we strive for accuracy, plant diagnoses may sometimes be incorrect due to various factors including 
                  image quality, lighting conditions, and the complexity of plant health issues.
                </p>
                <p className="text-red-700 text-sm leading-relaxed mt-2">
                  <strong>PlantMD shall not be accountable for any consequences, damages, or losses that may occur to your plants 
                  based on our diagnosis or recommendations.</strong> We strongly recommend consulting with professional 
                  horticulturists, botanists, or plant care experts for critical plant health decisions.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700">1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">1.1 Personal Information</h3>
                <p className="text-gray-700 mb-3">
                  We may collect personally identifiable information you voluntarily provide, including:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Location (for plant care recommendations)</li>
                  <li>Feedback and support requests</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">1.2 Non-Personal Information</h3>
                <p className="text-gray-700 mb-3">
                  Automatically collected data includes:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Device information (device ID, OS version, browser type)</li>
                  <li>Usage data (pages visited, actions taken)</li>
                  <li>IP address and general location</li>
                  <li>Analytics data</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">1.3 Optional Inputs</h3>
                <p className="text-gray-700 mb-3">
                  If the user uploads images (e.g., of plants), we may collect:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Image metadata</li>
                  <li>Health diagnosis input or notes</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Your Information */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700">2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">
                We use your information to:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>Provide plant care insights and tailored suggestions</li>
                <li>Diagnose plant conditions through AI tools</li>
                <li>Improve our service through analytics</li>
                <li>Communicate with you (e.g., service updates, feedback)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </CardContent>
          </Card>

          {/* How We Share Your Information */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700">3. How We Share Your Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700">
                We do not sell your personal information. We may share data:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>With trusted third-party service providers (e.g., analytics, hosting)</li>
                <li>When required by law, legal process, or governmental request</li>
                <li>To enforce our <Link href="/terms" className="text-green-700 underline hover:text-green-700">Terms of Service</Link> and protect the safety of users</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700">4. Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We implement appropriate administrative, technical, and physical safeguards to protect your information. 
                However, no electronic transmission or storage is 100% secure.
              </p>
            </CardContent>
          </Card>

          {/* Your Privacy Rights */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700">5. Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700">
                Depending on your region (e.g., EU/EEA, California):
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>You can request access, correction, or deletion of your personal data</li>
                <li>You can opt-out of certain data uses (e.g., email communications)</li>
                <li>You may have the right to data portability</li>
              </ul>
              <p className="text-gray-700">
                To exercise your rights, contact us. You can find our contact details and ways to reach us in the footer section of our homepage.
              </p>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700">6. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                PlantMD is not intended for children under 13. We do not knowingly collect personal data from children. 
                If we learn that we have, we will delete it promptly.
              </p>
            </CardContent>
          </Card>

          {/* Third-Party Links */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700">7. Third-Party Links</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Our Service may contain links to third-party sites. We are not responsible for the privacy practices 
                or content of those sites.
              </p>
            </CardContent>
          </Card>

          {/* Changes to This Policy */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700">8. Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. Changes will be notified via app notification 
                or by updating the "Effective Date" above. Continued use of the app after such changes indicates your agreement.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700">9. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p>
                If you have any questions about this Privacy Policy, please contact us. You can find our contact details and ways to reach us in the footer section of our homepage.
              </p>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />
        
        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>© 2025 PlantMD. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
