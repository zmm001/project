�}�� r   �N�ɛ���a	��4��_N��ꬩ=7����3N$�MX%�Q,d&��!�q�l��H���.,CP�������b�gۻzrp�y�x�V��io��c���R����N�I���4��C�<H�[~e��Q:mƜq���� �gNX��\xj�"'?Mg�A%1��I'A��q��`Џ��/`%!���s5ꬽ�\78�5�:������ ��|R����u]\ȉD�.�����o��?.�����_'Z���TK_?!Ǚ��p&�R��#�
��p�M�V��0�^R�0���L��:d%ߠJ{Ⱦv����-��K�ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�0�[{��o�GS�|� �{�����'������<�N�)�G�	�.�F��5UI��	O�yb��x����M�r��%yxV~3��G�䳽�8|0��(�s2�/m.�=���ǶL��[Ą���1�v�h��1l~�W�[m���xO5ר2	��* ��:U�YS+�������%.F[,'4��HO;|���!N~�>�W�Z���
����N+�q��+���
-$�F^�l��Y�U���$�3D"��zWw��3,F+��a�`�'�"G��D���l�B���"Z�أa�L���@��l	=bc�ۛ
~��Ң�4`�WS��x"Lw-��3`�݋��׋vEU=�q�j�Ot$x���5t��'xo/�ar������r"��P#�nY�Q���VW��E���x@���#�8��=3���?��O�k�oԄ�k|ҭO�f�e�$$l�_x�Z�7ayC���b��j��U��]ie��2�c��yIl�,na]h͎��*���s;y�����j~��&9��@J;G�S#� �s��,j�W(��!��V��i�f�<�y0��E�1�?�r�\<F�C]�B��h���R��M7.�O��9��lg�z<�K
'd���;�9�]�"������[�̨����?�����Ac�m���#�9���%��@�z�x	WL��KŌ0~�3d�/��Gl2'Hb#Z��ƀ okQ�y���c�a�0�ot+�6q(G�+BhTo1C]�V��`���~�ﬀV�UJ �����".���{��"��d��G�4mn��������j	����~G��C�5\���6846t�1�����qс3�۬�"@�������=�دW�cVRH�<f6�
���}�3@��$`%~�Fh��C}z��ׁ�{Ѵ[e�R��\�T���̇q��,��� ��7s� ���{_����o-��cR��O��kU�`�/�h0����O��-z>�'�c=!�3W��i�Ұ���NF_l�+���-�u��W\+�_#[FU�zL3��򡻔��@��3���eʻ�)��MU�Sv���v�?���:M�8Y�Zv�t���G����j$ae\�qlOOS=�W��i�=hO��9��9��M�lP$�;7}�H\"B�oF\�p�d�*س�Rw�;]�1���s�pTC�"�0�~r�a��80���Hr������~b��)\bN�?L]�&��P�S�c~����nN]]}�J�U�j���j��Q��< �R��_�K�C�J`Rp�M1TR�X���1��2 <�����Be�^�l9��ɞ����>=�k̥�,A��
���[?Fs^�����~O���LLy=vkQ_�s��T{�t����w(q�kr�8�� �B�0h4���������a��Ϟ���ވl#@"D�ہ4��`~��/��ּ��j���BE�у%
%⁴�=\�̀��+�~8˜��.Tӓ��\��}�"�2H��bȝ�/// you flush many small segments). 
		/// </summary>
		public virtual void  SetMinMergeDocs(int minMergeDocs)
		{
			minMergeSize = minMergeDocs;
		}
		
		/// <summary>Get the minimum size for a segment to remain
		/// un-merged.
		/// </summary>
		/// <seealso cref="setMinMergeDocs *">
		/// </seealso>
		public virtual int GetMinMergeDocs()
		{
			return (int) minMergeSize;
		}
	}
}