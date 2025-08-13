import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function TermsOfService() {
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
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Terms of Service</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Please read these Terms of Service carefully before using PlantMD
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Introduction */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700">
                Terms of Service
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none p-6">
              <p>
                Welcome to PlantMD ("we", "our", or "us"). These Terms of Service ("Terms") govern your use of our mobile application, website, and associated services (collectively, the "Service") operated by PlantMD.
              </p>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
              </p>
            </CardContent>
          </Card>

          {/* Acceptance of Terms */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700">1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-4">
                By using PlantMD, you confirm that you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Are at least 13 years of age</li>
                <li>Have the legal capacity to enter into these Terms</li>
                <li>Agree to comply with all applicable laws and regulations</li>
                <li>Will use the Service in accordance with these Terms</li>
              </ul>
            </CardContent>
          </Card>

          {/* Description of Service */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700">2. Description of Service</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-4">
                PlantMD provides AI-powered plant disease detection and treatment recommendations. Our Service includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Image analysis for plant disease identification</li>
                <li>Treatment recommendations and care suggestions</li>
                <li>Educational content about plant health</li>
                <li>Community features for sharing plant experiences</li>
              </ul>
              <p className="mt-4">
                <strong>Important Notice:</strong> PlantMD is for informational and educational purposes only. Our recommendations are not a substitute for professional agricultural or horticultural advice.
              </p>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700">3. User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-4">You agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate information when using our Service</li>
                <li>Use the Service only for lawful purposes</li>
                <li>Not upload images that violate others' privacy or intellectual property rights</li>
                <li>Not attempt to reverse engineer, hack, or compromise our Service</li>
                <li>Respect other users in community interactions</li>
                <li>Not use the Service for commercial purposes without our written consent</li>
              </ul>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700">4. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-4">
                The PlantMD Service, including its content, features, and functionality, is owned by PlantMD and is protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="mb-4">
                You retain ownership of images you upload, but you grant us a license to use them for providing our Service and improving our AI models.
              </p>
            </CardContent>
          </Card>

          {/* Disclaimers */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700">5. Disclaimers and Limitations</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-4">
                <strong>Service Accuracy:</strong> While we strive for accuracy, PlantMD's AI analysis may not always be correct. Always consult with agricultural professionals for critical plant health decisions.
              </p>
              <p className="mb-4">
                <strong>Service Availability:</strong> We do not guarantee that our Service will be available at all times or will be error-free.
              </p>
              <p className="mb-4">
                <strong>Limitation of Liability:</strong> PlantMD shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.
              </p>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700">6. Privacy</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p>
                Your privacy is important to us. Please review our{" "}
                <Link href="/privacy" className="text-green-700 underline hover:text-green-700">
                  Privacy Policy
                </Link>
                , which also governs your use of the Service, to understand our practices.
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700">7. Termination</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-4">
                We may terminate or suspend your access to our Service immediately, without prior notice, for any reason, including breach of these Terms.
              </p>
              <p>
                You may also terminate your use of our Service at any time by discontinuing use of the application.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700">8. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p>
                We reserve the right to modify or replace these Terms at any time. If changes are material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700">9. Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of Nepal, without regard to its conflict of law provisions.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-green-700">10. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p>
                If you have any questions about these Terms of Service, please contact us. You can find our contact details and ways to reach us in the footer section of our homepage.
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
