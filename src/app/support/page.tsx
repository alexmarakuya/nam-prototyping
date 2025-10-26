'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export default function SupportPage() {
  const [selectedConversation, setSelectedConversation] = useState('baggage-policy');
  const [showNotification, setShowNotification] = useState(true);
  const [showExpandedResponse, setShowExpandedResponse] = useState(false);
  const [showAIAnalysis, setShowAIAnalysis] = useState<Record<string, boolean>>({});
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState<Record<string, boolean>>({});
  const [copiedResponse, setCopiedResponse] = useState<Record<string, boolean>>({});
  const [loadedSections, setLoadedSections] = useState<Record<string, string[]>>({});
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  // Resizable columns state
  const [columnWidths, setColumnWidths] = useState<number[]>([320, 0, 320]); // [left, middle, right] in pixels
  const [isResizing, setIsResizing] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Resize functionality
  const handleMouseDown = useCallback((e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setIsResizing(index);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isResizing === null || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const mouseX = e.clientX - containerRect.left;
    const resizeHandleWidth = 2; // Total width of both resize handles
    
    const newWidths = [...columnWidths];
    
    if (isResizing === 0) {
      // Resizing between left and middle column
      const maxLeftWidth = containerWidth - columnWidths[2] - resizeHandleWidth - 300; // Leave room for middle and right
      const leftWidth = Math.max(200, Math.min(maxLeftWidth, mouseX));
      const rightWidth = columnWidths[2];
      const middleWidth = containerWidth - leftWidth - rightWidth - resizeHandleWidth;
      
      if (middleWidth >= 300) { // Minimum middle width
        newWidths[0] = leftWidth;
        newWidths[1] = middleWidth;
        newWidths[2] = rightWidth;
      }
    } else if (isResizing === 1) {
      // Resizing between middle and right column
      const leftWidth = columnWidths[0];
      const maxRightWidth = containerWidth - leftWidth - resizeHandleWidth - 300; // Leave room for middle
      const rightWidth = Math.max(200, Math.min(maxRightWidth, containerWidth - mouseX));
      const middleWidth = containerWidth - leftWidth - rightWidth - resizeHandleWidth;
      
      if (middleWidth >= 300) { // Minimum middle width
        newWidths[0] = leftWidth;
        newWidths[1] = middleWidth;
        newWidths[2] = rightWidth;
      }
    }
    
    setColumnWidths(newWidths);
  }, [isResizing, columnWidths]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(null);
  }, []);

  useEffect(() => {
    if (isResizing !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  // Calculate middle column width dynamically
  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const leftWidth = columnWidths[0];
      const rightWidth = columnWidths[2];
      const resizeHandleWidth = 2; // Total width of both resize handles
      const middleWidth = containerWidth - leftWidth - rightWidth - resizeHandleWidth;
      
      // Ensure middle column has minimum width
      if (middleWidth >= 300 && middleWidth !== columnWidths[1]) {
        setColumnWidths([leftWidth, middleWidth, rightWidth]);
      }
    }
  }, [columnWidths[0], columnWidths[2]]);

  const [conversations, setConversations] = useState([
    {
      id: 'baggage-policy',
      customer: 'Kartik Kapgate',
      subject: 'Baggage policy for Iberia flight',
      time: 'Aug 18, 3:58 PM',
      pnr: 'C7Q3SR',
      status: 'active',
      priority: 'medium',
      isNew: false
    },
    {
      id: 'test-ticket',
      customer: 'Sumanth Na...',
      subject: 'Re: test ticket',
      time: 'Aug 8, 10:43 AM',
      pnr: null,
      status: 'draft',
      priority: 'low',
      isNew: false
    },
    {
      id: 'general-inquiry',
      customer: 'Sergey Kolo...',
      subject: 'Hey there?',
      time: 'Aug 5, 11:44 AM',
      pnr: null,
      status: 'pending',
      priority: 'low',
      isNew: false
    },
    {
      id: 'welcome-draft',
      customer: 'Sena Örücü',
      subject: 'hello',
      time: 'Jul 30, 9:31 AM',
      pnr: null,
      status: 'draft',
      priority: 'low',
      isNew: false
    }
  ]);

  const handleNotificationClose = () => {
    setShowNotification(false);
    
    // Add new flight change inquiry email after a short delay
    setTimeout(() => {
      const newConversation = {
        id: 'flight-change-request',
        customer: 'Maria Rodriguez',
        subject: 'Flight change request - AA1234',
        time: 'Just now',
        pnr: 'B8X9KL',
        status: 'active',
        priority: 'high',
        isNew: true
      };
      
      setConversations(prev => [newConversation, ...prev]);
      // Don't automatically switch to the new conversation - user needs to click it
    }, 1000);
  };

  const getCurrentConversation = () => {
    return conversations.find(c => c.id === selectedConversation);
  };

  const handleTriggerAI = (conversationId: string) => {
    setIsLoadingAnalysis(prev => ({
      ...prev,
      [conversationId]: true
    }));
    setLoadedSections(prev => ({
      ...prev,
      [conversationId]: []
    }));
    
    // Progressive loading simulation
    const sections = ['overview', 'summary', 'analysis', 'response'];
    
    sections.forEach((section, index) => {
      setTimeout(() => {
        setLoadedSections(prev => ({
          ...prev,
          [conversationId]: [...(prev[conversationId] || []), section]
        }));
        
        // If all sections are loaded, finish the loading process
        if (index === sections.length - 1) {
          setTimeout(() => {
            setIsLoadingAnalysis(prev => ({
              ...prev,
              [conversationId]: false
            }));
            // Don't set showAIAnalysis - content is already loaded progressively
          }, 300);
        }
      }, (index + 1) * 800); // 800ms intervals
    });
  };

  const handleCopyResponse = async (conversationId: string) => {
    try {
      // Get the response text based on conversation type
      let responseText = '';
      
      if (conversationId === 'flight-change-request') {
        responseText = `Hi Maria,

I understand you need to change your flight due to a family emergency. I can help you with that.

Change Fee & Options
Your Economy ticket has a change fee of $200 USD plus any fare difference.

Here are your best options:
• Sept 29, AA1234 at 2:30 PM - Same flight, no fare difference (Total: $200)
• Sept 28, AA1240 at 6:30 PM - $25 fare difference (Total: $225)
• Sept 28, AA1236 at 1:15 PM - $50 fare difference (Total: $250)

I recommend the September 29th option as it's the most cost-effective. Would you like me to proceed with this change?

I can process this immediately to secure your new seat.

Best regards,
Acai Travel Support Team`;
      } else {
        // Default baggage policy response
        responseText = `Hi Kartik,

Thanks for contacting Acai Travel.

Here is the baggage policy for your booking (PNR: C7Q3SR) with Iberia:

Carry-On Baggage
• Economy / Premium Economy: 1 cabin bag (max size 56x40x25 cm, max weight 10 kg) and 1 personal accessory (max size 30x40x15 cm).
• Business Class (Short/Medium Haul): 1 cabin bag (max size 56x40x25 cm, max weight 14 kg) and 1 personal accessory.
• Business Plus (Long Haul): 2 cabin bags (each max size 56x40x25 cm, max weight 14 kg) and 1 personal accessory.

Checked Baggage
Economy Class: Typically 1 piece (max weight 23 kg, max dimensions 158 cm total).
Business Class: 2 or more pieces (max weight 23 kg each).

Special Items
• Sports Equipment: Must be pre-booked and paid for.
• Musical Instruments: Included in the baggage allowance for Iberia Plus members.
• Pets: Not allowed in the cabin or hold on flights to/from London but can be transported as cargo.

For more details, you can visit Iberia's official baggage pages.

Let me know if you have any further questions or need assistance.

Thanks,
Acai Travel Virtual Agent`;
      }

      await navigator.clipboard.writeText(responseText);
      
      // Show copied feedback
      setCopiedResponse(prev => ({
        ...prev,
        [conversationId]: true
      }));
      
      // Hide feedback after 2 seconds
      setTimeout(() => {
        setCopiedResponse(prev => ({
          ...prev,
          [conversationId]: false
        }));
      }, 2000);
      
    } catch (error) {
      console.error('Failed to copy response:', error);
    }
  };

  const renderConversationContent = () => {
    const conversation = getCurrentConversation();
    if (!conversation) return null;

    if (conversation.id === 'flight-change-request') {
      return {
        title: 'Flight Change Request - American Airlines',
        customer: 'Maria Rodriguez',
        customerInitial: 'M',
        ticketId: 'ACA-5',
        message: {
          content: `Hello,

I need to change my flight AA1234 from New York to Los Angeles scheduled for tomorrow (September 26th) to a later date due to a family emergency. 

My current booking details:
- Flight: AA1234 (JFK → LAX)
- Date: September 26, 2024
- Time: 2:30 PM EST
- Seat: 14A (Economy)
- PNR: B8X9KL

I would prefer to travel on September 28th or 29th if possible. Could you please let me know:
1. What are the change fees for my ticket type?
2. What alternative flights are available on those dates?
3. Any fare difference I need to pay?

This is urgent as I need to make arrangements soon.

Thank you for your assistance.

Best regards,
Maria Rodriguez`,
          signature: `—
Maria Rodriguez
maria.rodriguez@email.com`,
          time: 'Today, 4:22 PM'
        }
      };
    }

    // Default baggage policy conversation
    return {
      title: 'Baggage Policy Inquiry - Iberia Flight',
      customer: 'Kartik Kapgate',
      customerInitial: 'K',
      ticketId: 'ACA-4',
      message: {
        content: `Hi there,

I have a booking with Iberia (PNR: C7Q3SR) and I need to understand the baggage policy for my upcoming flight. Could you please provide details about carry-on and checked baggage allowances?

Thanks for your help!`,
        signature: `—
Kartik Kapgate`,
        time: 'Aug 18, 2:15 PM'
      }
    };
  };

  return (
    <div className="h-screen flex relative" style={{ backgroundColor: '#ECEAF1' }}>
      {/* Left Sidebar */}
      <div className="w-64 flex flex-col pt-6">
        {/* Header */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span className="text-base font-medium text-gray-900">Inbox</span>
              <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1.5 hover:bg-gray-200 rounded-lg">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="p-1.5 rounded-lg" style={{ backgroundColor: '#6257F4' }} onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#5146E3'} onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#6257F4'}>
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4">
          <div className="space-y-1">
            {/* Open - Active */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg" style={{ backgroundColor: '#D3D3DD' }}>
              <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter">
                <path d="M3 5L3 19C3 20.1046 3.89543 21 5 21L19 21C20.1046 21 21 20.1046 21 19L21 5C21 3.89543 20.1046 3 19 3L5 3C3.89543 3 3 3.89543 3 5Z" />
                <path d="M3 15H8V17H16V15H21" />
              </svg>
              <span className="text-sm font-medium text-gray-900 flex-1">Open</span>
              <span className="text-xs text-gray-600 bg-gray-300 px-1.5 py-0.5 rounded">4</span>
            </div>

            {/* Later */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg cursor-pointer" style={{ backgroundColor: 'transparent' }} onMouseEnter={(e) => (e.target as HTMLDivElement).style.backgroundColor = '#D3D3DD'} onMouseLeave={(e) => (e.target as HTMLDivElement).style.backgroundColor = 'transparent'}>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-700 flex-1">Later</span>
            </div>

            {/* Done */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg cursor-pointer" style={{ backgroundColor: 'transparent' }} onMouseEnter={(e) => (e.target as HTMLDivElement).style.backgroundColor = '#D3D3DD'} onMouseLeave={(e) => (e.target as HTMLDivElement).style.backgroundColor = 'transparent'}>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-700 flex-1">Done</span>
            </div>

            {/* Drafts */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg cursor-pointer" style={{ backgroundColor: 'transparent' }} onMouseEnter={(e) => (e.target as HTMLDivElement).style.backgroundColor = '#D3D3DD'} onMouseLeave={(e) => (e.target as HTMLDivElement).style.backgroundColor = 'transparent'}>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm text-gray-700 flex-1">Drafts</span>
              <span className="text-xs text-gray-600 bg-gray-300 px-1.5 py-0.5 rounded">3</span>
            </div>

            {/* Less */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg cursor-pointer" style={{ backgroundColor: 'transparent' }} onMouseEnter={(e) => (e.target as HTMLDivElement).style.backgroundColor = '#D3D3DD'} onMouseLeave={(e) => (e.target as HTMLDivElement).style.backgroundColor = 'transparent'}>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              <span className="text-sm text-gray-500 flex-1">Less</span>
            </div>

            {/* Sent */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-gray-200 rounded-lg cursor-pointer">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="text-sm text-gray-700 flex-1">Sent</span>
            </div>

            {/* Trash */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-gray-200 rounded-lg cursor-pointer">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="text-sm text-gray-700 flex-1">Trash</span>
            </div>

            {/* Spam */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-gray-200 rounded-lg cursor-pointer" style={{ backgroundColor: 'transparent' }}>
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-6h2v4h-2v-4z"/>
              </svg>
              <span className="text-sm text-gray-700 flex-1">Spam</span>
            </div>
          </div>

          {/* Shared Section */}
          <div className="mt-6">
            <div className="text-xs font-medium text-gray-500 mb-2 px-3">Shared</div>
            <div className="space-y-1">
              {/* Acai Travel Inc */}
              <div className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-gray-200 rounded-lg cursor-pointer">
                <div className="w-4 h-4 bg-teal-500 rounded-md flex items-center justify-center text-white text-xs font-bold">A</div>
                <span className="text-sm text-gray-700 flex-1">Acai Travel Inc.</span>
                <span className="text-xs text-gray-600 bg-gray-300 px-1.5 py-0.5 rounded">1</span>
              </div>

              {/* Support */}
              <div className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-gray-200 rounded-lg cursor-pointer">
                <div className="w-4 h-4 bg-red-500 rounded-md flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3"/>
                  </svg>
                </div>
                <span className="text-sm text-gray-700 flex-1">Support</span>
                <span className="text-xs text-gray-600 bg-gray-300 px-1.5 py-0.5 rounded">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Wrapper - Four Columns */}
      <div className="flex-1 p-4 pl-0 pr-0">
        <div 
          ref={containerRef}
          className="h-full rounded-xl shadow-sm border border-gray-200 flex overflow-hidden max-w-full" 
          style={{ backgroundColor: '#FCFBFE' }}
        >
          {/* Column 1: Open/Conversations List */}
          <div 
            className={`border-r border-gray-200 flex flex-col ${showMobileSidebar ? 'flex' : 'hidden lg:flex'}`} 
            style={{ 
              backgroundColor: '#FCFBFE',
              width: `${columnWidths[0]}px`,
              minWidth: '200px',
              maxWidth: '600px'
            }}
          >
            {/* Conversations Header */}
            <div className="h-12 flex items-center px-4" style={{ backgroundColor: '#FCFBFE' }}>
              <div className="flex items-center gap-3">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter">
                    <line x1="15" y1="4" x2="15" y2="20" />
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" transform="translate(24) rotate(90)" />
                  </svg>
                </button>
                <div className="w-px h-4 bg-gray-300"></div>
                <h1 className="text-base font-medium text-gray-900">Open</h1>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
                {/* Mobile close button */}
                <button 
                  className="p-1 hover:bg-gray-100 rounded lg:hidden"
                  onClick={() => setShowMobileSidebar(false)}
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="px-4 py-3">
              <div className="flex gap-1">
                <button className="px-2 py-1 text-xs font-medium text-gray-900 bg-gray-100 rounded border border-gray-200">All</button>
                <button className="px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded border border-gray-200">Conversations</button>
                <button className="px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded border border-gray-200">Tasks</button>
                <button className="px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded border border-gray-200">Discussions</button>
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto p-2">
              <div className="space-y-1">
                {conversations.map((conversation) => {
                  const isSelected = selectedConversation === conversation.id;
                  const getStatusColor = (status: string, priority: string, isNew: boolean) => {
                    if (isNew) return 'bg-blue-500';
                    if (priority === 'high') return 'bg-red-500';
                    if (status === 'active') return 'bg-purple-500';
                    if (status === 'draft') return 'bg-blue-500';
                    if (status === 'pending') return 'bg-purple-500';
                    return 'bg-gray-400';
                  };
                  
                  return (
                    <div 
                      key={conversation.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'bg-blue-50 border border-blue-200' 
                          : 'hover:bg-gray-50 border border-gray-200'
                      } ${conversation.isNew ? 'animate-slideInSimple' : ''}`}
                      onClick={() => {
                        setSelectedConversation(conversation.id);
                        // Mark as read when clicked
                        if (conversation.isNew) {
                          setConversations(prev => 
                            prev.map(c => 
                              c.id === conversation.id 
                                ? { ...c, isNew: false }
                                : c
                            )
                          );
                        }
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getStatusColor(conversation.status, conversation.priority, conversation.isNew)}`}></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-sm font-medium truncate ${conversation.isNew ? 'text-blue-800' : 'text-gray-900'}`}>
                              {conversation.customer}
                              {conversation.isNew && <span className="ml-1 text-xs text-blue-600">(New)</span>}
                            </span>
                            <span className="text-xs text-gray-500">{conversation.time}</span>
                          </div>
                          <div className="text-sm text-gray-600 mb-1">{conversation.subject}</div>
                          {conversation.pnr && (
                            <div className="text-xs text-blue-600">PNR: {conversation.pnr}</div>
                          )}
                          {conversation.status === 'draft' && !conversation.pnr && (
                            <div className="text-xs text-blue-600">Shared draft hello</div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Resize Handle 1 */}
          <div
            className="w-px bg-gray-200 hover:bg-gray-400 cursor-col-resize flex-shrink-0 transition-colors lg:block hidden"
            onMouseDown={(e) => handleMouseDown(e, 0)}
          />

          {/* Column 2: Dynamic Ticket Content */}
          <div 
            className="flex flex-col" 
            style={{ 
              backgroundColor: '#FCFBFE',
              width: `${columnWidths[1]}px`,
              minWidth: '300px'
            }}
          >
            {/* Mobile menu button */}
            <div className="lg:hidden p-4 border-b border-gray-200">
              <button 
                onClick={() => setShowMobileSidebar(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Conversations
              </button>
            </div>
            {(() => {
              const contentData = renderConversationContent();
              if (!contentData) return null;
              
              return (
                <>
                  {/* Header */}
                  <div className="h-14 flex items-center justify-between px-6" style={{ backgroundColor: '#FCFBFE' }}>
                    <div className="flex items-center gap-4">
                      <h1 className="text-lg font-medium text-gray-900 truncate max-w-md" title={contentData.title}>{contentData.title}</h1>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <div className="flex items-center gap-2 rounded-lg px-3 py-1 border border-gray-300 min-w-0 flex-shrink-0">
                        <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-white text-xs font-medium">{contentData.customerInitial}</div>
                        <span className="text-sm font-medium text-gray-900 truncate whitespace-nowrap" title={contentData.customer}>{contentData.customer.split(' ')[0]} {contentData.customer.split(' ')[1]?.[0]}.</span>
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg px-3 py-1.5 border border-gray-300">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <circle cx="12" cy="12" r="10" strokeDasharray="4 4" />
                        </svg>
                        <span className="text-sm font-medium text-gray-900">Open</span>
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Ticket Header */}
                  <div className="border-b border-gray-200 px-6 py-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4m16 0l-2-2m-14 2l2-2" />
                        </svg>
                        <span className="text-base font-medium text-gray-900">Support</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-base font-medium text-gray-900">{contentData.ticketId}</span>
                      </div>

                      <button className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </button>

                      <div className="w-px h-6 bg-gray-300"></div>

                      <button className="p-1 hover:bg-gray-100 rounded">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {(() => {
                const contentData = renderConversationContent();
                if (!contentData) return null;
                
                return (
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    {/* Message Content */}
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-medium flex-shrink-0">{contentData.customerInitial}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-gray-900">{contentData.customer}</span>
                            <span className="text-sm text-gray-500">To: support@acai.travel</span>
                            <span className="text-xs text-gray-400 ml-auto">{contentData.message.time}</span>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                              </svg>
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                              </svg>
                            </button>
                          </div>
                          <div className="text-gray-900 mb-4">
                            {contentData.message.content.split('\n').map((line, index) => (
                              <p key={index} className={line.trim() ? "mb-2" : "mb-1"}>
                                {line || '\u00A0'}
                              </p>
                            ))}
                          </div>
                          <div className="border-t border-gray-200 pt-3">
                            {contentData.message.signature.split('\n').map((line, index) => (
                              <div key={index} className="text-sm text-gray-900 font-medium">{line}</div>
                            ))}
                            <div className="text-sm text-gray-500 mt-2">Sent from <span className="font-medium text-gray-900">Gmail</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Open in Support Status Bar */}
            <div className="px-4 py-3 flex justify-center">
              <div className="inline-flex items-center justify-between rounded-lg px-4 py-3 max-w-md" style={{ backgroundColor: '#E7E9FE' }}>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" strokeDasharray="4 4" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Open in Support</span>
                </div>
                <div className="flex items-center gap-2 ml-8">
                  <span className="text-sm font-medium text-blue-600">Change status</span>
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Comment Input Area */}
            <div className="p-4">
              <div className="rounded-lg px-4 py-3 flex items-center justify-between" style={{ backgroundColor: '#EFEEF1' }}>
                <input 
                  type="text" 
                  placeholder="Add internal comment"
                  className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-500 border-none outline-none"
                />
                <div className="flex items-center gap-2 ml-4">
                  {/* Attachment/Paperclip Icon */}
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  {/* @ Mention Icon */}
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <circle cx="12" cy="12" r="4"/>
                      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/>
                    </svg>
                  </button>
                  {/* Emoji/Smiley Icon */}
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                      <line x1="9" y1="9" x2="9.01" y2="9"/>
                      <line x1="15" y1="9" x2="15.01" y2="9"/>
                    </svg>
                  </button>
                  {/* GIF Icon */}
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <path d="M7 8h3v8H7V8zM14 8h3v2h-3V8zM14 12h3v4h-3v-4z"/>
                    </svg>
                  </button>
                  {/* Expand/Fullscreen Icon */}
                  <button className="p-1 hover:bg-gray-200 rounded">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Resize Handle 2 */}
          <div
            className="w-px bg-gray-200 hover:bg-gray-400 cursor-col-resize flex-shrink-0 transition-colors lg:block hidden"
            onMouseDown={(e) => handleMouseDown(e, 1)}
          />

          {/* Column 3: Acai AI Assistant */}
          <div 
            className="border-l border-gray-200 flex flex-col" 
            style={{ 
              backgroundColor: '#FCFBFE',
              width: `${columnWidths[2]}px`,
              minWidth: '200px',
              maxWidth: '600px'
            }}
          >
            <div className="h-12 flex items-center justify-between px-4 border-b border-gray-200" style={{ backgroundColor: '#FCFBFE' }}>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.77527 0.0955505C11.4023 -0.38485 13.8874 0.974207 16.4559 3.54282C19.0248 6.11189 20.3846 8.59791 19.9042 11.2254C19.6787 12.4582 19.0815 13.4661 18.4579 14.2772C17.8633 15.0504 17.137 15.7759 16.5077 16.4051C16.4903 16.4225 16.4731 16.4407 16.4559 16.4579C16.4389 16.4749 16.4214 16.4924 16.4042 16.5096C15.7751 17.1389 15.0493 17.8643 14.2762 18.4588C13.4652 19.0825 12.4572 19.6796 11.2245 19.9051C8.59725 20.3856 6.11164 19.0268 3.54285 16.4579C0.974152 13.8888 -0.384976 11.4027 0.0955811 8.77524C0.321149 7.5425 0.918258 6.53452 1.54187 5.72348C2.13643 4.95024 2.8618 4.22378 3.49109 3.59457L3.5946 3.49106C4.22364 2.86183 4.94953 2.13639 5.72253 1.54184C6.53354 0.918146 7.54257 0.321115 8.77527 0.0955505ZM9.99988 6.00082C8.40837 6.00082 7.21761 6.34954 6.55261 7.31235C6.24061 7.76411 6.11358 8.26145 6.05554 8.7059C6.00025 9.12947 5.99984 9.57886 5.99988 9.9686V10.0331C5.99984 10.4229 6.00021 10.873 6.05554 11.2967C6.1136 11.741 6.2408 12.2377 6.55261 12.6893C7.21761 13.6521 8.40837 14.0008 9.99988 14.0008C11.5914 14.0008 12.7822 13.6521 13.4471 12.6893C13.7589 12.2378 13.8862 11.741 13.9442 11.2967C13.9995 10.873 13.9999 10.4229 13.9999 10.0331V9.9686C13.9999 9.57887 13.9995 9.12946 13.9442 8.7059C13.8862 8.26147 13.7591 7.76409 13.4471 7.31235C12.7822 6.34955 11.5914 6.00083 9.99988 6.00082Z" fill="#8043F9"/>
                </svg>
                <h2 className="text-base font-medium text-gray-900">Acai</h2>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              {(() => {
                const conversation = getCurrentConversation();
                if (!conversation) return null;

                const isAnalysisShown = showAIAnalysis[conversation.id];
                const isLoading = isLoadingAnalysis[conversation.id];
                const loaded = loadedSections[conversation.id] || [];
                const hasProgressiveContent = loaded.length > 0;
                
                // Auto-show analysis for Kartik's baggage policy email
                const shouldShowAnalysis = isAnalysisShown || conversation.id === 'baggage-policy';

                // Show progressive loading if AI is processing OR if we have progressive content (but only for Maria's email)
                if ((isLoading || hasProgressiveContent) && conversation.id === 'flight-change-request') {
                  
                  // Determine which section should show (either skeleton or content)
                  const sections = ['overview', 'summary', 'analysis', 'response'];
                  const currentSection = sections.find(section => !loaded.includes(section)) || sections[sections.length - 1];
                  
                  return (
                    <div className="space-y-4">
                      {/* Case Overview */}
                      {(currentSection === 'overview' || loaded.includes('overview')) && (
                        <>
                          {loaded.includes('overview') ? (
                            <div className="mb-3 animate-fadeInUp">
                              <h2 className="text-sm font-semibold text-gray-900 mb-2">Case Overview</h2>
                              <div className="flex gap-1 mb-2">
                                <span className="px-2 py-1 bg-white text-gray-700 text-xs font-medium rounded border border-gray-200">PNR B8X9KL</span>
                                <span className="px-2 py-1 bg-white text-gray-700 text-xs font-medium rounded border border-gray-200">Flight AA1234</span>
                              </div>
                            </div>
                          ) : (
                            <div className="mb-3">
                              <div className="skeleton h-4 w-24 rounded mb-2"></div>
                              <div className="flex gap-1 mb-2">
                                <div className="skeleton h-6 w-20 rounded"></div>
                                <div className="skeleton h-6 w-24 rounded"></div>
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      {/* Case Summary */}
                      {(currentSection === 'summary' || loaded.includes('summary')) && loaded.includes('overview') && (
                        <>
                          {loaded.includes('summary') ? (
                            <div className="mb-3 animate-fadeInUp">
                              <h3 className="text-xs font-semibold text-gray-900 mb-1">Case Summary:</h3>
                              <p className="text-xs text-gray-700 leading-relaxed">
                                Maria Rodriguez requests flight change from AA1234 (JFK→LAX) on Sept 26 to Sept 28/29 due to family emergency. Economy ticket requires change fee analysis and alternative flight options.
                              </p>
                            </div>
                          ) : (
                            <div className="mb-3">
                              <div className="skeleton h-3 w-20 rounded mb-1"></div>
                              <div className="space-y-1">
                                <div className="skeleton h-3 w-full rounded"></div>
                                <div className="skeleton h-3 w-4/5 rounded"></div>
                                <div className="skeleton h-3 w-3/4 rounded"></div>
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      {/* Analysis Content */}
                      {(currentSection === 'analysis' || loaded.includes('analysis')) && loaded.includes('summary') && (
                        <>
                          {loaded.includes('analysis') ? (
                            <div className="mb-3 animate-fadeInUp">
                              <h3 className="text-xs font-semibold text-gray-900 mb-1">Change Penalties & Options:</h3>
                              <div className="bg-red-50 border border-red-200 rounded p-2 mb-2">
                                <h4 className="text-xs font-semibold text-red-800 mb-1">Change Fee</h4>
                                <p className="text-xs text-red-700">$200 USD + fare difference</p>
                              </div>
                              
                              <div className="bg-blue-50 border border-blue-200 rounded p-2">
                                <h4 className="text-xs font-semibold text-blue-800 mb-1">Available Alternatives</h4>
                                <div className="space-y-1 text-xs text-blue-700">
                                  <div>• Sept 28: AA1236 (JFK→LAX) 1:15 PM - $50 fare diff</div>
                                  <div>• Sept 28: AA1240 (JFK→LAX) 6:30 PM - $25 fare diff</div>
                                  <div>• Sept 29: AA1234 (JFK→LAX) 2:30 PM - No fare diff</div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="mb-3">
                              <div className="skeleton h-3 w-32 rounded mb-2"></div>
                              <div className="bg-gray-50 border border-gray-200 rounded p-2 mb-2">
                                <div className="skeleton h-3 w-16 rounded mb-1"></div>
                                <div className="skeleton h-3 w-24 rounded"></div>
                              </div>
                              <div className="bg-gray-50 border border-gray-200 rounded p-2">
                                <div className="skeleton h-3 w-28 rounded mb-1"></div>
                                <div className="space-y-1">
                                  <div className="skeleton h-2 w-full rounded"></div>
                                  <div className="skeleton h-2 w-5/6 rounded"></div>
                                  <div className="skeleton h-2 w-4/5 rounded"></div>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      {/* Smart Response */}
                      {(currentSection === 'response' || loaded.includes('response')) && loaded.includes('analysis') && (
                        <>
                          {loaded.includes('response') ? (
                            <div className="bg-white rounded-lg border border-gray-200 animate-fadeInUp">
                              <div className="flex items-center justify-between px-3 py-1 border-b border-gray-200 bg-white rounded-t-lg">
                                <h3 className="text-xs font-medium text-gray-900">Smart Response Draft</h3>
                                <div className="flex items-center gap-1">
                                  <div className="relative group">
                                    <button 
                                      onClick={() => handleCopyResponse(conversation.id)}
                                      className={`p-0.5 rounded transition-all duration-200 hover:bg-gray-100 hover:scale-110 ${
                                        copiedResponse[conversation.id] ? 'text-green-600' : 'text-gray-600 hover:text-gray-800'
                                      }`}
                                    >
                                      {copiedResponse[conversation.id] ? (
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                      ) : (
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                                        </svg>
                                      )}
                                    </button>
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                      {copiedResponse[conversation.id] ? 'Copied!' : 'Copy'}
                                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                                    </div>
                                  </div>
                                  <div className="relative group">
                                    <button 
                                      onClick={() => setShowExpandedResponse(!showExpandedResponse)}
                                      className="p-0.5 text-gray-600 hover:text-gray-800 rounded transition-all duration-200 hover:bg-gray-100 hover:scale-110"
                                    >
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                        {showExpandedResponse ? (
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                        ) : (
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        )}
                                      </svg>
                                    </button>
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                      {showExpandedResponse ? 'Collapse' : 'Expand'}
                                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="px-3 py-3">
                                <div className={`relative ${!showExpandedResponse ? 'max-h-20 overflow-hidden' : ''}`}>
                                  <div className="space-y-2 text-xs text-gray-700">
                                    <p>Hi Maria,</p>
                                    <p>I understand you need to change your flight due to a family emergency. I can help you with that.</p>
                                    
                                    <div className="mt-2">
                                      <p className="font-semibold">Change Fee & Options:</p>
                                      <p>• Standard change fee: $200 USD</p>
                                      <p>• Best option: Sept 29 flight (no fare difference)</p>
                                      <p>• Total cost: $200 USD</p>
                                    </div>
                                    
                                    <p className="mt-2">I can process this change immediately. Would you like me to proceed?</p>
                                    
                                    <p className="mt-2">Best regards,</p>
                                    <p>Acai Travel Support Team</p>
                                  </div>
                                  
                                  {!showExpandedResponse && (
                                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-white rounded-lg border border-gray-200">
                              <div className="flex items-center justify-between px-3 py-1 border-b border-gray-200">
                                <div className="skeleton h-3 w-28 rounded"></div>
                                <div className="flex gap-1">
                                  <div className="skeleton h-4 w-4 rounded"></div>
                                  <div className="skeleton h-4 w-4 rounded"></div>
                                </div>
                              </div>
                              <div className="px-3 py-3 space-y-2">
                                <div className="skeleton h-3 w-16 rounded"></div>
                                <div className="skeleton h-3 w-full rounded"></div>
                                <div className="skeleton h-3 w-4/5 rounded"></div>
                                <div className="skeleton h-3 w-3/4 rounded"></div>
                                <div className="skeleton h-3 w-5/6 rounded"></div>
                              </div>
                            </div>
                          )}

                          {/* Need More Help */}
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mt-3">
                            <h3 className="text-xs font-semibold text-purple-900 mb-2">Need more help to close the case?</h3>
                            <button 
                              onClick={() => window.open('/acai-redirect', '_blank')}
                              className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors duration-200"
                            >
                              Ask Acai
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  );
                }

                // Show trigger button if analysis hasn't been requested yet
                if (!shouldShowAnalysis) {
                  return (
                    <div className="flex flex-col items-center text-center pt-16">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                        <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.77527 0.0955505C11.4023 -0.38485 13.8874 0.974207 16.4559 3.54282C19.0248 6.11189 20.3846 8.59791 19.9042 11.2254C19.6787 12.4582 19.0815 13.4661 18.4579 14.2772C17.8633 15.0504 17.137 15.7759 16.5077 16.4051C16.4903 16.4225 16.4731 16.4407 16.4559 16.4579C16.4389 16.4749 16.4214 16.4924 16.4042 16.5096C15.7751 17.1389 15.0493 17.8643 14.2762 18.4588C13.4652 19.0825 12.4572 19.6796 11.2245 19.9051C8.59725 20.3856 6.11164 19.0268 3.54285 16.4579C0.974152 13.8888 -0.384976 11.4027 0.0955811 8.77524C0.321149 7.5425 0.918258 6.53452 1.54187 5.72348C2.13643 4.95024 2.8618 4.22378 3.49109 3.59457L3.5946 3.49106C4.22364 2.86183 4.94953 2.13639 5.72253 1.54184C6.53354 0.918146 7.54257 0.321115 8.77527 0.0955505ZM9.99988 6.00082C8.40837 6.00082 7.21761 6.34954 6.55261 7.31235C6.24061 7.76411 6.11358 8.26145 6.05554 8.7059C6.00025 9.12947 5.99984 9.57886 5.99988 9.9686V10.0331C5.99984 10.4229 6.00021 10.873 6.05554 11.2967C6.1136 11.741 6.2408 12.2377 6.55261 12.6893C7.21761 13.6521 8.40837 14.0008 9.99988 14.0008C11.5914 14.0008 12.7822 13.6521 13.4471 12.6893C13.7589 12.2378 13.8862 11.741 13.9442 11.2967C13.9995 10.873 13.9999 10.4229 13.9999 10.0331V9.9686C13.9999 9.57887 13.9995 9.12946 13.9442 8.7059C13.8862 8.26147 13.7591 7.76409 13.4471 7.31235C12.7822 6.34955 11.5914 6.00083 9.99988 6.00082Z" fill="#8043F9"/>
                        </svg>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">AI Analysis Available</h3>
                      <p className="text-xs text-gray-600 mb-4 max-w-xs">
                        Get instant AI-powered insights, recommendations, and draft responses for this case.
                      </p>
                      <button
                        onClick={() => handleTriggerAI(conversation.id)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Analyze with AI
                      </button>
                    </div>
                  );
                }

                if (conversation.id === 'flight-change-request') {
                  return (
                    <div className="animate-fadeInUp">
                      {/* Case Overview Header */}
                      <div className="mb-3 animate-stagger-1">
                        <h2 className="text-sm font-semibold text-gray-900 mb-2">Case Overview</h2>
                        <div className="flex gap-1 mb-2">
                          <span className="px-2 py-1 bg-white text-gray-700 text-xs font-medium rounded border border-gray-200">PNR B8X9KL</span>
                          <span className="px-2 py-1 bg-white text-gray-700 text-xs font-medium rounded border border-gray-200">Flight AA1234</span>
                        </div>
                      </div>

                      {/* Case Summary */}
                      <div className="mb-3 animate-stagger-2">
                        <h3 className="text-xs font-semibold text-gray-900 mb-1">Case Summary:</h3>
                        <p className="text-xs text-gray-700 leading-relaxed">
                          Maria Rodriguez requests flight change from AA1234 (JFK→LAX) on Sept 26 to Sept 28/29 due to family emergency. Economy ticket requires change fee analysis and alternative flight options.
                        </p>
                      </div>

                      {/* Flight Change Analysis */}
                      <div className="mb-3 animate-stagger-3">
                        <h3 className="text-xs font-semibold text-gray-900 mb-1">Change Penalties & Options:</h3>
                        <div className="bg-red-50 border border-red-200 rounded p-2 mb-2">
                          <h4 className="text-xs font-semibold text-red-800 mb-1">Change Fee</h4>
                          <p className="text-xs text-red-700">$200 USD + fare difference</p>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded p-2">
                          <h4 className="text-xs font-semibold text-blue-800 mb-1">Available Alternatives</h4>
                          <div className="space-y-1 text-xs text-blue-700">
                            <div>• Sept 28: AA1236 (JFK→LAX) 1:15 PM - $50 fare diff</div>
                            <div>• Sept 28: AA1240 (JFK→LAX) 6:30 PM - $25 fare diff</div>
                            <div>• Sept 29: AA1234 (JFK→LAX) 2:30 PM - No fare diff</div>
                          </div>
                        </div>
                      </div>

                      {/* Smart Response Draft */}
                      <div className="bg-white rounded-lg border border-gray-200 animate-stagger-4">
                        {/* Header */}
                        <div className="flex items-center justify-between px-3 py-1 border-b border-gray-200 bg-white rounded-t-lg">
                          <h3 className="text-xs font-medium text-gray-900">Smart Response Draft</h3>
                          <div className="flex items-center gap-1">
                            <div className="relative group">
                              <button 
                                onClick={() => handleCopyResponse(conversation.id)}
                                className={`p-0.5 rounded transition-all duration-200 hover:bg-gray-100 hover:scale-110 ${
                                  copiedResponse[conversation.id] ? 'text-green-600' : 'text-gray-600 hover:text-gray-800'
                                }`}
                              >
                                {copiedResponse[conversation.id] ? (
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : (
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                                  </svg>
                                )}
                              </button>
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                {copiedResponse[conversation.id] ? 'Copied!' : 'Copy'}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                              </div>
                            </div>
                            <div className="relative group">
                              <button 
                                onClick={() => setShowExpandedResponse(!showExpandedResponse)}
                                className="p-0.5 text-gray-600 hover:text-gray-800 rounded transition-all duration-200 hover:bg-gray-100 hover:scale-110"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                  {showExpandedResponse ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                  ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                  )}
                                </svg>
                              </button>
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                {showExpandedResponse ? 'Collapse' : 'Expand'}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="px-3 py-3">
                          <div className={`relative ${!showExpandedResponse ? 'max-h-20 overflow-hidden' : ''}`}>
                            <div className="space-y-2 text-xs text-gray-700">
                              <p>Hi Maria,</p>
                              <p>I understand you need to change your flight due to a family emergency. I can help you with that.</p>
                              
                              <div className="mt-2">
                                <h4 className="font-semibold text-gray-900 mb-1">Change Fee & Options</h4>
                                <p className="text-xs text-gray-700 mb-1">Your Economy ticket has a change fee of <strong>$200 USD</strong> plus any fare difference.</p>
                                
                                <p className="text-xs text-gray-700 mb-1">Here are your best options:</p>
                                <ul className="space-y-1 text-xs text-gray-700 ml-2">
                                  <li>• <strong>Sept 29, AA1234 at 2:30 PM</strong> - Same flight, no fare difference (Total: $200)</li>
                                  <li>• Sept 28, AA1240 at 6:30 PM - $25 fare difference (Total: $225)</li>
                                  <li>• Sept 28, AA1236 at 1:15 PM - $50 fare difference (Total: $250)</li>
                                </ul>
                              </div>

                              <p className="mt-2">I recommend the September 29th option as it&apos;s the most cost-effective. Would you like me to proceed with this change?</p>
                              
                              <p className="mt-2">I can process this immediately to secure your new seat.</p>
                              
                              <p className="mt-2">Best regards,</p>
                              <p>Acai Travel Support Team</p>
                            </div>
                            
                            {!showExpandedResponse && (
                              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Need More Help */}
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mt-3">
                        <h3 className="text-xs font-semibold text-purple-900 mb-2">Need more help to close the case?</h3>
                        <button 
                          onClick={() => window.open('/acai-redirect', '_blank')}
                          className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors duration-200"
                        >
                          Ask Acai
                        </button>
                      </div>
                    </div>
                  );
                }

                // Default baggage policy content
                return (
                  <>
                    {/* Case Overview Header */}
                    <div className="mb-3">
                      <h2 className="text-sm font-semibold text-gray-900 mb-2">Case Overview</h2>
                      <div className="flex gap-1 mb-2">
                        <span className="px-2 py-1 bg-white text-gray-700 text-xs font-medium rounded border border-gray-200">PNR C7Q3SR</span>
                        <span className="px-2 py-1 bg-white text-gray-700 text-xs font-medium rounded border border-gray-200">PCC YTOGO3100</span>
                      </div>
                    </div>

                    {/* Case Summary */}
                    <div className="mb-3">
                      <h3 className="text-xs font-semibold text-gray-900 mb-1">Case Summary:</h3>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        Kartik Kapgate requested information about the baggage policy for their booking with Iberia. The analysis provided details on carry-on and checked baggage allowances for Economy Class (S and L). No ATC was used for this analysis.
                      </p>
                    </div>

                    {/* Smart Response Draft */}
                    <div className="bg-white rounded-lg border border-gray-200">
                      {/* Header */}
                      <div className="flex items-center justify-between px-3 py-1 border-b border-gray-200 bg-white rounded-t-lg">
                        <h3 className="text-xs font-medium text-gray-900">Smart Response Draft</h3>
                        <div className="flex items-center gap-1">
                          <div className="relative group">
                            <button 
                              onClick={() => handleCopyResponse(conversation.id)}
                              className={`p-0.5 rounded transition-all duration-200 hover:bg-gray-100 hover:scale-110 ${
                                copiedResponse[conversation.id] ? 'text-green-600' : 'text-gray-600 hover:text-gray-800'
                              }`}
                            >
                              {copiedResponse[conversation.id] ? (
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                                </svg>
                              )}
                            </button>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                              {copiedResponse[conversation.id] ? 'Copied!' : 'Copy'}
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                            </div>
                          </div>
                          <div className="relative group">
                            <button 
                              onClick={() => setShowExpandedResponse(!showExpandedResponse)}
                              className="p-0.5 text-gray-600 hover:text-gray-800 rounded transition-all duration-200 hover:bg-gray-100 hover:scale-110"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                {showExpandedResponse ? (
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                ) : (
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                )}
                              </svg>
                            </button>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                              {showExpandedResponse ? 'Collapse' : 'Expand'}
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-3 py-3">
                        <div className={`relative ${!showExpandedResponse ? 'max-h-20 overflow-hidden' : ''}`}>
                          <div className="space-y-2 text-xs text-gray-700">
                            <p>Hi Kartik,</p>
                            <p>Thanks for contacting Acai Travel.</p>
                            <p>Here is the baggage policy for your booking (PNR: C7Q3SR) with Iberia:</p>

                            <div className="mt-2">
                              <h4 className="font-semibold text-gray-900 mb-1">Carry-On Baggage</h4>
                              <ul className="space-y-1 text-xs text-gray-700 ml-2">
                                <li>• Economy / Premium Economy: 1 cabin bag (max size 56x40x25 cm, max weight 10 kg) and 1 personal accessory (max size 30x40x15 cm).</li>
                                <li>• Business Class (Short/Medium Haul): 1 cabin bag (max size 56x40x25 cm, max weight 14 kg) and 1 personal accessory.</li>
                                <li>• Business Plus (Long Haul): 2 cabin bags (each max size 56x40x25 cm, max weight 14 kg) and 1 personal accessory.</li>
                              </ul>
                            </div>

                            <div className="mt-2">
                              <h4 className="font-semibold text-gray-900 mb-1">Checked Baggage</h4>
                              <p className="text-xs text-gray-700">Economy Class: Typically 1 piece (max weight 23 kg, max dimensions 158 cm total).</p>
                              <p className="text-xs text-gray-700">Business Class: 2 or more pieces (max weight 23 kg each).</p>
                            </div>

                            <div className="mt-2">
                              <h4 className="font-semibold text-gray-900 mb-1">Special Items</h4>
                              <ul className="space-y-1 text-xs text-gray-700 ml-2">
                                <li>• Sports Equipment: Must be pre-booked and paid for.</li>
                                <li>• Musical Instruments: Included in the baggage allowance for Iberia Plus members.</li>
                                <li>• Pets: Not allowed in the cabin or hold on flights to/from London but can be transported as cargo.</li>
                              </ul>
                            </div>

                            <p className="mt-2">
                              For more details, you can visit Iberia&apos;s official baggage pages: 
                              <a href="#" className="text-purple-600 underline hover:text-purple-800 ml-1">Carry-on Baggage</a> and 
                              <a href="#" className="text-purple-600 underline hover:text-purple-800 ml-1">Checked Baggage</a>.
                            </p>

                            <p className="mt-2">Let me know if you have any further questions or need assistance.</p>
                            
                            <p className="mt-2">Thanks,</p>
                            <p>Acai Travel Virtual Agent</p>
                          </div>
                          
                          {!showExpandedResponse && (
                            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Need More Help */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mt-3">
                      <h3 className="text-xs font-semibold text-purple-900 mb-2">Need more help to close the case?</h3>
                      <button 
                        onClick={() => window.open('/acai-redirect', '_blank')}
                        className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors duration-200"
                      >
                        Ask Acai
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Right Icon Sidebar */}
      <div className="w-16 flex flex-col items-center py-6 gap-4" style={{ backgroundColor: '#ECEAF1' }}>
        {/* Green Books/Documentation Icon */}
        <div className="w-10 h-10 flex items-center justify-center">
          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
          </svg>
        </div>

        {/* Dark Terminal/Console Icon */}
        <div className="w-10 h-10 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
            <path d="m6 11 2 2-2 2"/>
            <path d="m10 13 4 0"/>
          </svg>
        </div>

        {/* Pink/Magenta Analytics Icon */}
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-200">
          <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
          </svg>
        </div>

        {/* Red Calendar Icon */}
        <div className="w-10 h-10 flex items-center justify-center">
          <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
          </svg>
        </div>

        {/* AI Assistant Icon */}
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-200">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.77527 0.0955505C11.4023 -0.38485 13.8874 0.974207 16.4559 3.54282C19.0248 6.11189 20.3846 8.59791 19.9042 11.2254C19.6787 12.4582 19.0815 13.4661 18.4579 14.2772C17.8633 15.0504 17.137 15.7759 16.5077 16.4051C16.4903 16.4225 16.4731 16.4407 16.4559 16.4579C16.4389 16.4749 16.4214 16.4924 16.4042 16.5096C15.7751 17.1389 15.0493 17.8643 14.2762 18.4588C13.4652 19.0825 12.4572 19.6796 11.2245 19.9051C8.59725 20.3856 6.11164 19.0268 3.54285 16.4579C0.974152 13.8888 -0.384976 11.4027 0.0955811 8.77524C0.321149 7.5425 0.918258 6.53452 1.54187 5.72348C2.13643 4.95024 2.8618 4.22378 3.49109 3.59457L3.5946 3.49106C4.22364 2.86183 4.94953 2.13639 5.72253 1.54184C6.53354 0.918146 7.54257 0.321115 8.77527 0.0955505ZM9.99988 6.00082C8.40837 6.00082 7.21761 6.34954 6.55261 7.31235C6.24061 7.76411 6.11358 8.26145 6.05554 8.7059C6.00025 9.12947 5.99984 9.57886 5.99988 9.9686V10.0331C5.99984 10.4229 6.00021 10.873 6.05554 11.2967C6.1136 11.741 6.2408 12.2377 6.55261 12.6893C7.21761 13.6521 8.40837 14.0008 9.99988 14.0008C11.5914 14.0008 12.7822 13.6521 13.4471 12.6893C13.7589 12.2378 13.8862 11.741 13.9442 11.2967C13.9995 10.873 13.9999 10.4229 13.9999 10.0331V9.9686C13.9999 9.57887 13.9995 9.12946 13.9442 8.7059C13.8862 8.26147 13.7591 7.76409 13.4471 7.31235C12.7822 6.34955 11.5914 6.00083 9.99988 6.00082Z" fill="#8043F9"/>
          </svg>
        </div>

        {/* Bottom Grid/Menu Icon */}
        <div className="mt-auto">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="5" cy="5" r="2"/>
              <circle cx="12" cy="5" r="2"/>
              <circle cx="19" cy="5" r="2"/>
              <circle cx="5" cy="12" r="2"/>
              <circle cx="12" cy="12" r="2"/>
              <circle cx="19" cy="12" r="2"/>
              <circle cx="5" cy="19" r="2"/>
              <circle cx="12" cy="19" r="2"/>
              <circle cx="19" cy="19" r="2"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Notification Popup */}
      {showNotification && (
        <div className="fixed bottom-4 left-4 w-72 bg-indigo-600 rounded-lg shadow-lg text-white p-4 z-50">
          <button 
            onClick={handleNotificationClose}
            className="absolute top-2 right-2 text-white hover:text-gray-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 19V20H3V19L5 17V11C5 7.9 7 5.2 10 4.3V4C10 2.9 10.9 2 12 2S14 2.9 14 4V4.3C17 5.2 19 7.9 19 11V17L21 19ZM17 11C17 8.2 14.8 6 12 6S7 8.2 7 11V18H17V11Z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-white mb-1">Enable notifications</h3>
              <p className="text-sm text-indigo-100 mb-3">
                Get instant alerts for new emails and important updates.
              </p>
              <button className="bg-white text-indigo-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100">
                Enable
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}