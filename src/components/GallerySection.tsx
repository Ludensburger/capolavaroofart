"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FramedArtwork from "./FramedArtwork";
import { artworks, type Artwork } from "@/data/artworks";
import { Button } from "./ui/button";
import { X } from "lucide-react";

const filters = ["All", "Dry Media", "Paintings"];
const spring = { type: "spring" as const, duration: 0.4, bounce: 0 };
const ARTWORKS_PER_PAGE = 6; // Show 9 artworks per page (nice number for 3-column grid)

// Generate deterministic values based on artwork ID to avoid hydration mismatches
const getDeterministicOffset = (id: string, type: 'translateY' | 'translateX' | 'rotation' | 'zIndex' | 'marginBottom', colSpan: number = 1) => {
  // Create a simple hash from the ID
  const hash = id.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  // Use the hash to generate consistent pseudo-random values
  const random = Math.abs(Math.sin(hash) * 10000) % 1;
  
  switch(type) {
    case 'translateY':
      return ((random - 0.5) * (colSpan > 1 ? 15 : 25)).toFixed(1);
    case 'translateX':
      return ((random - 0.5) * 8).toFixed(1);
    case 'rotation':
      return ((random - 0.5) * 1.2).toFixed(2);
    case 'zIndex':
      return Math.floor(random * 5);
    case 'marginBottom':
      return (24 + (random * 24)).toFixed(1);
    default:
      return "0";
  }
};

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedWork, setSelectedWork] = useState<Artwork | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(0);
  const [mounted, setMounted] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Handle mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Track window width for responsive adjustments
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get filtered artworks based on selected filter
  const filteredArtworks = activeFilter === "All"
    ? artworks
    : artworks.filter((a) => a.series === activeFilter);

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredArtworks.length / ARTWORKS_PER_PAGE));
  
  // Get current page artworks (this is our limit!)
  const paginatedArtworks = filteredArtworks.slice(
    (currentPage - 1) * ARTWORKS_PER_PAGE,
    currentPage * ARTWORKS_PER_PAGE
  );

  // Check if there's a "most recent" to feature (only on page 1)
  const mostRecent = activeFilter === "All" && currentPage === 1 && filteredArtworks.length > 0 
    ? filteredArtworks[0] 
    : null;

  // Calculate base column count based on screen size
  const getBaseColumnCount = () => {
    if (!mounted) return 2; // Default for SSR
    if (windowWidth < 640) return 1; // Mobile: 1 column
    if (windowWidth < 1024) return 2; // Tablet: 2 columns
    return 3; // Desktop and up: 3 columns
  };

  // Generate organic layout based on painting dimensions
  const getOrganicLayout = (work: Artwork) => {
    const [widthStr, heightStr] = work.dimensions.split(' × ').map(s => parseFloat(s.split(' ')[0]));
    const aspectRatio = widthStr / heightStr;
    
    // Determine painting shape
    const isLandscape = aspectRatio > 1.2;
    const isPanoramic = aspectRatio > 1.8;
    const isVeryTall = aspectRatio < 0.6;
    const isSquare = aspectRatio >= 0.8 && aspectRatio <= 1.2;
    
    // Base column count
    const baseCols = getBaseColumnCount();
    
    // Determine column span
    let colSpan = 1;
    
    if (baseCols === 3) {
      // Desktop 3-column layout
      if (isPanoramic) {
        colSpan = 3;
      } else if (isLandscape || isVeryTall) {
        colSpan = 2;
      } else if (isSquare) {
        // Use deterministic "random" based on ID
        const randomValue = Math.abs(Math.sin(work.id.charCodeAt(0)) * 100) % 1;
        colSpan = randomValue > 0.7 ? 2 : 1;
      }
    } else if (baseCols === 2) {
      // Tablet 2-column layout
      if (isPanoramic || isLandscape || isVeryTall) {
        colSpan = 2;
      }
    }
    
    return {
      colSpan,
      translateY: getDeterministicOffset(work.id, 'translateY', colSpan),
      translateX: getDeterministicOffset(work.id, 'translateX'),
      rotation: getDeterministicOffset(work.id, 'rotation'),
      zIndex: parseInt(getDeterministicOffset(work.id, 'zIndex') as string),
      marginBottom: getDeterministicOffset(work.id, 'marginBottom'),
    };
  };

  // Handle page changes
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Scroll back to gallery top smoothly
    galleryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Don't render anything until after mounting to prevent hydration mismatch
  if (!mounted) {
    return (
      <section id="gallery" className="py-16 md:py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-20" /> {/* Placeholder for filters */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 p-4 sm:p-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-100 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="py-16 md:py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto" ref={galleryRef}>
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={spring}
        >
          <div className="flex gap-2">
            {filters.map((f) => (
              <Button
                key={f}
                variant="secondary"
                size="sm"
                onClick={() => {
                  setActiveFilter(f);
                  setCurrentPage(1); // Reset to page 1 on filter change
                }}
                className={activeFilter === f ? "bg-foreground text-background" : ""}
              >
                {f}
              </Button>
            ))}
          </div>
          
          {/* Artwork count indicator */}
          <p className="text-sm text-muted-foreground">
            Showing {paginatedArtworks.length} of {filteredArtworks.length} works
          </p>
        </motion.div>

        {/* Most Recent - Full Width Hero (only on page 1) */}
        {mostRecent && (
          <motion.div
            className="mb-20 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...spring }}
          >
            <span className="section-label mb-6 block self-start text-sm uppercase tracking-wider text-muted-foreground">
              Most Recent Work
            </span>
            <div className="w-full flex justify-center">
              <FramedArtwork
                src={mostRecent.url}
                alt={mostRecent.title}
                onClick={() => setSelectedWork(mostRecent)}
                className="max-h-[50vh] lg:max-h-[60vh] w-auto mx-auto object-contain shadow-2xl"
              />
            </div>
            <div className="mt-6 px-4 text-center w-full max-w-3xl">
              <p className="font-display text-2xl md:text-3xl font-medium text-foreground">
                {mostRecent.title}
              </p>
              <p className="text-base md:text-lg text-muted-foreground tnum mt-2">
                {mostRecent.year} · {mostRecent.medium}
              </p>
              <p className="text-sm text-muted-foreground/60 tnum mt-1">
                {mostRecent.dimensions}
              </p>
            </div>
          </motion.div>
        )}

        {/* ORGANIC 3-COLUMN GRID LAYOUT */}
        {paginatedArtworks.length > 0 ? (
          <div 
            className="grid p-4 sm:p-8 max-w-7xl mx-auto"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${getBaseColumnCount()}, minmax(0, 1fr))`,
              gridAutoRows: 'minmax(250px, auto)',
              gap: '2.5rem',
            }}
          >
            {paginatedArtworks.map((work: Artwork) => {
              const [widthStr, heightStr] = work.dimensions.split(' × ').map(s => parseFloat(s.split(' ')[0]));
              const aspectRatio = widthStr / heightStr;
              const { colSpan, translateX, translateY, rotation, zIndex, marginBottom } = getOrganicLayout(work);
              
              return (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ ...spring }}
                  className="relative cursor-pointer group"
                  style={{
                    gridColumn: `span ${colSpan}`,
                    transform: `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg)`,
                    zIndex,
                    marginBottom: `${marginBottom}px`,
                  }}
                  onClick={() => setSelectedWork(work)}
                >
                  {/* Painting Container */}
                  <div className="relative w-full">
                    {/* Aspect ratio container */}
                    <div 
                      className="relative w-full"
                      style={{ 
                        paddingBottom: `${(1 / aspectRatio) * 100}%`,
                      }}
                    >
                      {/* FramedArtwork component */}
                      <div className="absolute inset-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.2)] transition-shadow duration-300">
                        <FramedArtwork
                          src={work.url}
                          alt={work.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    
                    {/* Hover overlay with title */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                      initial={false}
                    >
                      <div className="text-white">
                        <p className="font-medium">{work.title}</p>
                        <p className="text-sm text-white/80">{work.year}</p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No artworks found in this category.</p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div 
            className="flex flex-col items-center mt-16 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="min-w-[100px]"
              >
                Previous
              </Button>
              
              {/* Page numbers */}
              <div className="flex items-center gap-1 px-2">
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  // Show limited page numbers with ellipsis for many pages
                  if (
                    totalPages <= 7 ||
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
                  ) {
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className="w-10"
                      >
                        {pageNum}
                      </Button>
                    );
                  } else if (
                    pageNum === currentPage - 3 ||
                    pageNum === currentPage + 3
                  ) {
                    return <span key={pageNum} className="px-2">...</span>;
                  }
                  return null;
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="min-w-[100px]"
              >
                Next
              </Button>
            </div>
            
            {/* Page indicator */}
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
          </motion.div>
        )}
      </div>

      {/* Modal (keep as is) */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              onClick={() => setSelectedWork(null)}
            />
            <motion.div
              className="relative z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={spring}
            >
              <FramedArtwork
                src={selectedWork.url}
                alt={selectedWork.title}
                className="w-full"
              />
              <div className="flex flex-col justify-center">
                <button
                  onClick={() => setSelectedWork(null)}
                  className="absolute top-0 right-0 md:top-2 md:right-2 p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
                <h3 className="heading-l2 text-foreground">{selectedWork.title}</h3>
                <p className="mt-2 text-muted-foreground font-body tnum">
                  {selectedWork.year} · {selectedWork.medium}
                </p>
                <p className="mt-1 text-muted-foreground/60 font-body text-sm tnum">
                  {selectedWork.dimensions}
                </p>
                <p className="mt-6 body-prose text-foreground/80">{selectedWork.story}</p>
                <Button variant="hero" size="lg" className="mt-8 self-start">
                  Inquire About This Work
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;