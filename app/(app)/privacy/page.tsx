"use client";
import React from 'react';
import { ArrowLeft, Shield, AlertTriangle, Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Introduction */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <FileText className="w-5 h-5" />
                Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Welcome to PlantMD ("we", "our", or "us"). Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application, website, and associated services (collectively, the "Service").
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using the PlantMD app, you agree to the terms of this Privacy Policy.
              </p>
            </CardContent>
          </Card>

          {/* Important Disclaimer */}
          <Card className="shadow-lg border-0 bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="w-5 h-5" />
                Important Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
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
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
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
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
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
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-green-700">3. How We Share Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We do not sell your personal information. We may share data:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>With trusted third-party service providers (e.g., analytics, hosting)</li>
                <li>When required by law, legal process, or governmental request</li>
                <li>To enforce our Terms and protect the safety of users</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
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
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-green-700">5. Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Depending on your region (e.g., EU/EEA, California):
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                <li>You can request access, correction, or deletion of your personal data</li>
                <li>You can opt-out of certain data uses (e.g., email communications)</li>
                <li>You may have the right to data portability</li>
              </ul>
              <p className="text-gray-700">
                To exercise your rights, contact us at{' '}
                <a href="mailto:plantmd.xyz@gmail.com" className="text-green-600 hover:text-green-700 underline">
                  plantmd.xyz@gmail.com
                </a>
              </p>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
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
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
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
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-green-700">8. Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. Changes will be notified via app notification 
                or by updating the "Effective Date" above. Continued use of the app after such changes indicates your agreement.
              </p>
            </CardContent>
          </Card>

          {/* Contact Us */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Mail className="w-5 h-5" />
                9. Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                If you have any questions or concerns about this Privacy Policy, please contact:
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-green-600" />
                  <a 
                    href="mailto:plantmd.xyz@gmail.com" 
                    className="text-green-700 hover:text-green-800 font-medium underline"
                  >
                    plantmd.xyz@gmail.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Effective Date */}
          <Card className="shadow-lg border-0 bg-gray-50 border-gray-200">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 text-center">
                <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 