�}X� r '  �����$,��a	��4��_N��ꬩ=7����3N$�MX%�Q,d&��!�q�l��H���.,CP�������b�gۻzrp�y�x�V��io��c���R����N�I���4��C�<H�[~e��Q:mƜq���� �gNX��\xj�"'?Mg�A%1��I'A��q��`Џ��/`%!���s5ꬽ�\78�5�:������ ��|R����u]\ȉD�.�����o��?.�����_'Z���TK_?!Ǚ��p&�R��#�
��p�M�V��0�^R�0���L��:d%ߠJ{Ⱦv����-��K�ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�0�[{��o�GS�|� �{�����'������<�N�)�G�	�.�F��5UI��	O�yb��x����M�r��%yxV~3��G�䳽�8|0��(�s2�/m.�=���ǶL��[Ą���1�v�h��1l~�W�[m���xO5ר2	��* ��:U�YS+�������%.F[,'4��HO;|���!N~�>�W�Z���
����N+�q��+���
-$�F^�l��Y�U���$�3D"��zWw��3,F+��a�`�'�"G��D���l�B���"Z�أa�L���@��l	(*^���'D1Z+��ȡ�X}�yY��=E;-�`�*i˒���͋vRU(�y�+�]Gga M���xj��DdQv�|uP������x"��R%�BT�Q�3��F3��&F�_Y��8�زd�q���7���,έ	�>�oԄ�k|ҭO�f�e�$$l�_x�Z�7ayC���b��j��U��]ie��2�c��yIl�&^�F,B����(c�Y��Ч�P� ��jv�����A):2�3�
�O$^p+�ؓU���'�?�*7����!��[��5���˗­b�0;�e�9�7i5:,`z_zlƕ�a�}��gh7��?��Kk"�m������x���'�馐K��[��J�4hh3��E�(]grj���L�a��i��}�=��+�+!���A��(��WC�e��6,I��u-Q�DTP��\�@X�C���p�P�;�s?$�e˘�3�r� lau��<�9��	������Vb�J��{�&�qp��\vz++wӉ�Zd�7��#�-��a,q#k#d&�:�q�ͤ���,�ÃP��K]��D?ؓ<[|=�UO0]DM ���qB��ڐf�?&zN[��i��(E~��F᳕M�!�:�L����:|[	�/t�tj7��1C�&�	u}z3��P�b>��h��!����4�:Cx��F���(:��� ȉ��?�I����ޢ�dvoid  Set(int docFreq, long freqPointer, long proxPointer, int skipOffset)
		{
			this.docFreq = docFreq;
			this.freqPointer = freqPointer;
			this.proxPointer = proxPointer;
			this.skipOffset = skipOffset;
		}
		
		internal void  Set(TermInfo ti)
		{
			docFreq = ti.docFreq;
			freqPointer = ti.freqPointer;
			proxPointer = ti.proxPointer;
			skipOffset = ti.skipOffset;
		}
	}
}