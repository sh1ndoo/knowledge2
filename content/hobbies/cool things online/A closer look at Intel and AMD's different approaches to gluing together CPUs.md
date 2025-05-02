---
link: https://www.theregister.com/2024/10/24/intel_amd_packaging/
byline: Tobias Mann
site: The Register
date created: 2024-10-24T08:30
slurped: 2025-04-08T21:20
title: A closer look at Intel and AMD's different approaches to gluing together CPUs
tags:
  - slurp
---

Analysis Shortly after the launch of AMD's first-gen Epyc processors codenamed Naples in 2017, Intel quipped that its competitor had been reduced to gluing a bunch of desktop dies together in order to stay relevant.

Unfortunately for Intel, that [comment](https://www.techpowerup.com/235092/intel-says-amd-epyc-processors-glued-together-in-official-slide-deck) hasn't exactly aged well as a few short years later, the x86 giant was reaching for the glue itself.

Intel's Xeon 6 processors, which began [rolling out](https://www.theregister.com/2024/09/24/intel_xeon_6p/) in phases this year, represent its third generation of multi-die Xeons and its first datacenter chips to embrace a heterogeneous chiplet architecture not unlike AMD's own.

While Intel eventually saw the wisdom of AMD's chiplet strategy, its approaches couldn't be more different.

### Overcoming the reticle limit

As a quick refresher on why so many CPU designs are moving away from monolithic architectures, it largely comes down to two factors: reticle limits and yields.

Generally speaking, short of major improvements in process technology, more cores inevitably mean more silicon. However, there are practical limits to how big dies can actually get - we refer to this as the reticle limit - which is roughly 800mm2. Once you bump up against the limit, the only way to continue scaling the compute is to use more dies.

We've now seen this done with a number of products - not just CPUs - which cram two large dies onto a single package. Gaudi 3, Nvidia's Blackwell, and Intel's Emerald Rapids Xeons are just a few examples.

The problem with multi-die is that the bridge between them is often a bottleneck in terms of bandwidth and has the potential to introduce additional latency. It's usually not as bad as splitting a workload across multiple sockets, but it's one of the reasons why some chip designers have favored using a smaller number of larger dies to scale compute.

Bigger dies are, however, really expensive to manufacture because defect rates are amplified the larger the die gets. This makes using lots of smaller dies an attractive proposition and explains why AMD's design uses so many — up to 17 in the latest Epycs.

With that primer out of the way, let's dig into the different design philosophies of Intel and AMD's latest Xeons and Epyc processors.

### Old hat for AMD

We'll kick things off with AMD's 5th-Gen Epyc [Turin processors](https://www.theregister.com/2024/10/10/amd_epyc_turin/). Specifically we're looking at the 128-core Zen 5 variant of the chip, which features 16 4 nm core complex dies (CCD) which surround a single I/O die (IOD) fabbed on TSMC's 6nm process tech.

[![AMD's latest Epycs are packed with up to 16 compute dies.](https://regmedia.co.uk/2024/10/22/amd_eypc_turin_top_down.jpg?x=648&y=414&infer_y=1 "AMD's latest Epycs are packed with up to 16 compute dies.")](https://regmedia.co.uk/2024/10/22/amd_eypc_turin_top_down.jpg)

AMD's latest Epycs are packed with up to 16 compute dies. - Click to enlarge

If this sounds familiar, that's because AMD has used this same basic formula going back to its second-gen Epyc processors. For reference, first-gen Epyc lacked a distinct I/O die.

As we mentioned earlier, using lots of smaller compute dies means AMD can get much higher yields, but it also means they can share silicon between Ryzen and Epyc processors.

[![If those chiplets look familiar, that's because AMD's Epyc and Ryzen processors actually share the same compute dies.](https://regmedia.co.uk/2024/10/22/ryzen-9000.jpg?x=648&y=419&infer_y=1 "If those chiplets look familiar, that's because AMD's Epyc and Ryzen processors actually share the same compute dies.")](https://regmedia.co.uk/2024/10/22/ryzen-9000.jpg)

If those chiplets look familiar, that's because AMD's Epyc and Ryzen processors actually share the same compute dies. - Click to enlarge

Additionally, using eight or 16 core CCDs, each with 32 MB of L3 cache, gives AMD additional flexibility when it comes to scaling core count in proportion to cache and memory.

For example, if you want an Epyc with 16 cores, a common SKU for HPC workloads due to licensing limitations, the most obvious way to achieve this would be using two eight-core CCDs with 64 MB of L3 cache between the two of them. However, you could also use 16 CCDs, each with a single core active but 512 MB cache on board. Now that might sound crazy, but both of those chips really [do exist](https://www.theregister.com/2024/10/15/amd_risk_cores/).

[![AMD's 5th-gen Epycs follow a familiar pattern with 16 compute dies surrounding a central I/O die.](https://regmedia.co.uk/2024/10/21/amd_epyc5_breakdown.jpg?x=648&y=414&infer_y=1 "AMD's 5th-gen Epycs follow a familiar pattern with 16 compute dies surrounding a central I/O die.")](https://regmedia.co.uk/2024/10/21/amd_epyc5_breakdown.jpg)

AMD's 5th-gen Epycs follow a familiar pattern with 16 compute dies surrounding a central I/O die. - Click to enlarge

The I/O die, on the other hand, is responsible for just about everything except compute, including memory, security, PCIe, CXL, and other I/O like SATA, and also serves as a backbone for communications between the chips' CCDs and other sockets.

[![Here's a closer look at AMD Epyc Turin I/O die.](https://regmedia.co.uk/2024/10/22/amd_turin_io.jpg?x=648&y=332&infer_y=1 "Here's a closer look at AMD Epyc Turin I/O die.")](https://regmedia.co.uk/2024/10/22/amd_turin_io.jpg)

Here's a closer look at AMD Epyc Turin I/O die. - Click to enlarge

Placing the memory controllers on the I/O die does come with some pros and cons. On the upside, this means that memory bandwidth, for the most part, scales independently of core count. The downside is potentially higher memory and cache access latencies for certain workloads. We emphasize "potentially" as this kind of thing is highly workload dependent.

### Xeon's chiplet journey

Turning to Intel, the chipmaker's approach to multi-die silicon differs considerably from AMD's. While modern Xeon processors utilize a heterogeneous architecture with distinct compute and I/O dies, this wasn't always the case.

Intel's first multi-die Xeon, codenamed [Sapphire Rapids](https://www.theregister.com/2023/01/10/after_big_delays_intels_new/), used either one monolithic, medium-core-count, die or four extreme-core-count dies, each of which had their own memory controller and I/O on board. Emerald Rapids [followed](https://www.theregister.com/2023/12/14/intel_xeon_ai/) a similar pattern but opted for two larger dies for the chip's higher core count SKUs.

[![As you can see between Sapphire and Emerald Rapids Intel made the switch from four medium-sized dies to a pair of nearly retical limited ones.](https://regmedia.co.uk/2024/10/22/intel-sapphire-to-emerald.jpg?x=648&y=414&infer_y=1 "As you can see between Sapphire and Emerald Rapids Intel made the switch from four medium-sized dies to a pair of nearly reticle limited ones.")](https://regmedia.co.uk/2024/10/22/intel-sapphire-to-emerald.jpg)

As you can see, between Sapphire and Emerald Rapids, Intel made the switch from four medium-sized dies to a pair of nearly retical limited ones. - Click to enlarge

All of this changed with Xeon 6, which saw Intel [move](https://www.theregister.com/2024/09/24/intel_xeon_6p/) the I/O, UPI links, and accelerators out to a pair of dies manufactured on the Intel 7 process node, which flanked either between one and three compute dies in the center built on Intel 3.

For reasons we'll get to in a bit, we're going to focus primarily on Intel's more mainstream Granite Rapids Xeon 6 processors rather than its many-cored Sierra Forest parts.

Taking a look at Intel's compute dies, we see the first major difference to AMD. Each compute tile has at least 43 cores on board, which can be fused on or off depending on the SKU. That means that Intel needs a lot fewer dies to achieve 128 cores than AMD, but it does come with the potential for lower yield rates due to its larger area.

[![Depending on the SKU Granite Rapids uses between one and three compute dies sandwiched between a pair of I/O dies.](https://regmedia.co.uk/2024/10/22/intel_granite_die.jpg?x=648&y=269&infer_y=1 "Depending on the SKU Granite Rapids uses between one and three compute dies sandwiched between a pair of I/O dies.")](https://regmedia.co.uk/2024/10/22/intel_granite_die.jpg)

Depending on the SKU, Granite Rapids uses between one and three compute dies sandwiched between a pair of I/O dies. - Click to enlarge

Along with more cores, Intel has opted to place the memory controller for these chips on the compute dies themselves, with four channels supported per die. In theory, this should make for lower access latencies, but it also means that all three dies need to be populated if you want all 12 memory channels.

For the 6900P-series parts we looked at last month, this isn't something you have to worry about as every SKU has three compute dies on board. That does, however, mean that the 72-core version is only making use of a fraction of the silicon on the package. Then again, the same could be said of that 16-core HPC-centric Epyc we discussed earlier.

Intel's 6700P-series parts, due out early next year, on the other hand, will come with either one or two compute dies depending on the desired memory bandwidth and core count, which means memory will be limited to 8 channels at the high end and potentially as few as four on configurations with a single compute die on board. We don't know a ton about the memory configuration on the HCC and LCC dies just yet, so there's a possibility Intel beefed up the memory controllers on those parts.

[![Just like AMD's Epyc, Intel's Xeon now utilizes a heterogenous chiplet architecture with compute and I/O dies.](https://regmedia.co.uk/2024/09/24/xeon_6_dies.jpg?x=442&y=186&infer_y=1 "Just like AMD's Epyc, Intel's Xeon now utilizes a heterogenous chiplet architecture with compute and I/O dies.")](https://regmedia.co.uk/2024/09/24/xeon_6_dies.jpg)

Just like AMD's Epyc, Intel's Xeon now utilizes a heterogenous chiplet architecture with compute and I/O dies. - Click to enlarge

Intel's I/O dies are also quite a bit skinnier and house a combination of PCIe, CXL, and UPI links for communications with storage, peripherals, and other sockets. Alongside these, we also find a host of accelerators for direct stream (DSA), in-memory analytics (IAA), encrypt/decrypt (QAT), and load balancing.

We're told that the placement of accelerators on the I/O die was done in part to place them closer to the data as it streams in and out of the chip.

- [Intel, AMD team with tech titans for x86 ISA overhaul](https://www.theregister.com/2024/10/15/intel_amd_x86_future/)
- [AMD pumps Epyc core count to 192, clocks up to 5 GHz with Turin debut](https://www.theregister.com/2024/10/10/amd_epyc_turin/)
- [With Granite Rapids, Intel is back to trading blows with AMD](https://www.theregister.com/2024/09/24/intel_xeon_6p/)
- [AMD downplays risk of growing blast radius, licensing fees from manycore chips](https://www.theregister.com/2024/10/15/amd_risk_cores/)

### Where do we go from here?

On the surface, Intel's next-generation of many-cored processors, codenamed Clearwater Forest, which are due out in the first half of next year, appear in a similar mold as Granite Rapids, with two I/O dies and a trio of compute tiles.

[![It might look like a shrunken down Granite Rapids, but apparently that's just structural silicon hiding a even more chiplets underneath.](https://regmedia.co.uk/2024/10/22/intel_clearwater_forest.jpg?x=648&y=418&infer_y=1 "It might look like a shrunken down Granite Rapids, but apparently that's just structural silicon hiding even more chiplets underneath.")](https://regmedia.co.uk/2024/10/22/intel_clearwater_forest.jpg)

It might look like a shrunken down Granite Rapids, but apparently that's just structural silicon hiding even more chiplets underneath. - Click to enlarge

However, looks can be deceiving. As we understand it, those three compute dies are actually just structural silicon hiding a number of smaller compute dies, which themselves are nestled atop an active silicon interposer.

Going off the [renderings](https://www.intel.com/content/www/us/en/foundry/library/advanced-process-technologies-for-data-center.html) intel showed off earlier this year, Clearwater Forest could use up to 12 compute dies per package. The use of silicon interposers is by no means new and offers a number of benefits including higher chip-to-chip bandwidth and lower latencies than you'd typically see in an organic substrate. That's quite the departure from the pair of 144-core compute dies found on Intel's highest core count Sierra Forest parts.

[![If this render Intel teased earlier this year is anything to go off of, Clearwater Forest is hiding a lot more chiplets than Granite Rapids](https://regmedia.co.uk/2024/10/22/clearwater_forest_render.jpg?x=648&y=364&infer_y=1 "If this render Intel teased earlier this year is anything to go off of, Clearwater Forest is hiding a lot more chiplets than Granite Rapids")](https://regmedia.co.uk/2024/10/22/clearwater_forest_render.jpg)

If this render Intel teased earlier this year is anything to go off of, Clearwater Forest is hiding a lot more chiplets than Granite Rapids - Click to enlarge

Of course, a rendering discussing the technologies that will be used in Clearwater forest doesn't mean that's exactly what we'll get when it arrives next year.

Perhaps the bigger question is where AMD will take its chiplet architecture next. Looking at AMD's 128-core Turin processors, there's not a lot of room left on the package for more silicon, but the House of Zen still has a few options to choose from.

First, AMD could simply opt for a bigger package to make room for additional chiplets. Alternatively, the chipmaker could also pack more cores onto a smaller die. However, we suspect that AMD's sixth-gen Epycs could actually end up looking a lot more like its Instinct [MI300-series](https://www.theregister.com/2023/12/06/amd_mi300_gpu/) accelerators.

[![MI300A meshes 24 Zen 4 cores, six CDNA 3 GPU dies and 128GB of HBM3 memory onto a single package aimed at HPC workloads](https://regmedia.co.uk/2023/12/06/mi300a_cover_image.jpg?x=442&y=313&infer_y=1 "MI300A meshes 24 Zen 4 cores, six CDNA 3 GPU dies and 128GB of HBM3 memory onto a single package aimed at HPC workloads")](https://regmedia.co.uk/2023/12/06/mi300a_cover_image.jpg)

MI300A meshes 24 Zen 4 cores, six CDNA 3 GPU dies and 128GB of HBM3 memory onto a single package aimed at HPC workloads - Click to enlarge

As you may recall, launched alongside the MI300X GPU was an APU that swapped two of the chip's CDNA3 tiles for a trio of CCDs with 24 Zen 4 cores between them. These compute tiles are stacked atop four I/O dies and are connected to a bank of eight HBM3 modules.

Now, again, this is just speculation, but it's not hard to imagine AMD doing something similar, switching out all that memory and GPU dies for additional CCDs instead. Such a design would conceivably benefit from higher bandwidth and lower latencies for die-to-die communications too.

Whether this will actually play out, only time will tell. We don't expect AMD's 6th-gen Epycs to arrive until late 2026. ®