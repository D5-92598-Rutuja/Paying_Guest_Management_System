import React from 'react';
import './announcements.css';

export default function AnnouncementsPage() {
  const announcements = [
    {
      id: 1,
      title: 'Monthly Maintenance Schedule',
      tag: 'Maintenance',
      dept: 'Facility Management',
      pubDate: 'Dec 10, 2024',
      dateTime: 'Dec 10, 10:00 AM',
      priority: 'high',
      excerpt:
        'Dear Residents, We have scheduled routine maintenance for the elevators and common areas on December 15th, 2024, from 10:00 AM to 2:00 PM. During this time, elevators may be temporarily unavailable. We apologize for any inconvenience and appreciate your cooperation.',
    },
    {
      id: 2,
      title: 'New Year Celebration Event',
      tag: 'Event',
      dept: 'Community Team',
      pubDate: 'Dec 8, 2024',
      dateTime: 'Dec 8, 3:30 PM',
      priority: 'medium',
      excerpt:
        'Join us for an exciting New Year celebration at the common area on December 31st, 2024, starting at 8:00 PM! There will be music, refreshments, and games. Come celebrate with your fellow residents and welcome 2025 together. RSVP at the reception desk.',
    },
    {
      id: 3,
      title: 'WiFi Network Upgrade Completed',
      tag: 'Update',
      dept: 'IT Department',
      pubDate: 'Dec 5, 2024',
      dateTime: 'Dec 5, 9:15 AM',
      priority: 'low',
      excerpt:
        'Great news! We have successfully completed the WiFi infrastructure upgrade across all floors. You should now experience significantly faster internet speeds (up to 100 Mbps) and better connectivity. Please restart your devices to connect to the new network. If you face any issues, contact our IT support.',
    },
    {
      id: 4,
      title: 'Security Reminder - Visitor Policy',
      tag: 'Security',
      dept: 'Security Team',
      pubDate: 'Dec 3, 2024',
      dateTime: 'Dec 3, 2:20 PM',
      priority: 'high',
      excerpt:
        'As a security measure, please ensure all visitors are registered at the reception desk before entering the premises. Visitors should carry valid ID proof and mention the resident they are visiting. Unregistered visitors will not be allowed entry after 10:00 PM for safety reasons.',
    },
    {
      id: 5,
      title: 'Laundry Service Schedule Update',
      tag: 'Service',
      dept: 'Housekeeping',
      pubDate: 'Nov 28, 2024',
      dateTime: 'Nov 28, 11:45 AM',
      priority: 'low',
      excerpt:
        'Starting December 1st, the laundry service will operate on updated timings: Monday to Friday (8 AM - 6 PM), Saturday (8 AM - 4 PM), and Sunday (10 AM - 2 PM). Please plan your laundry accordingly. Express service available with additional charges.',
    },
    {
      id: 6,
      title: 'Monthly Fire Safety Drill',
      tag: 'Safety',
      dept: 'Safety Department',
      pubDate: 'Nov 25, 2024',
      dateTime: 'Nov 25, 4:10 PM',
      priority: 'high',
      excerpt:
        'A mandatory fire safety drill will be conducted on December 20th, 2024, at 11:00 AM. All residents must participate and evacuate the building when the alarm sounds. Please familiarize yourself with the nearest fire exit routes. Duration: approximately 15 minutes.',
    },
  ];

  return (
    <div className="page-container">
      <div className="page-wrapper">
        <h1 className="page-title mt-3">Announcements</h1>
        <p className="page-subtitle">Stay updated with the latest news and important information</p>

        {announcements.map((a) => (
          <div key={a.id} className="announcement-card">
            <div>
              <div className="card-header">
                <div className={`card-icon priority-${a.priority}`}>{a.tag[0]}</div>
                <div>
                  <h2 className="card-title">{a.title}</h2>
                  <div className="card-meta">
                    <span className="tag">{a.tag}</span>
                    By {a.dept}
                  </div>
                </div>
              </div>

              <p className="card-content">{a.excerpt}</p>
            </div>

            <div className="card-side">
              <div>{a.pubDate}</div>
              <div className="card-datetime">
                <span>{a.dateTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
